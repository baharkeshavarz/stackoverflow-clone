"use server";

import Question from "@/database/question.model";
import db from "../db";
import { CreateQuestionParams, GetQuestionParams } from "./shared.types";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";

export async function getQuestions(params: GetQuestionParams) {
  try {
     db.connect();
     const questions = await Question.find({})
     .populate({ path: "tags",  model: Tag })
     .populate({ path: 'author', model: User }).
     sort( { createdAt: -1});

    return {questions};
  } catch (error) {
    console.log(error);
  }
  
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    db.connect();
    const { title, content, tags, author, path } = params;
    // Create Question
    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];
    // Create the tags or get them if they are already exits
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { question: question._id } },
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTag);
    }

    // Add tags to inserted question
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    revalidatePath(path);
  } catch (error) {
      console.log(error);
  }
}
