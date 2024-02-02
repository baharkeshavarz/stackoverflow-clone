"use server";

import Question from "@/database/question.model";
import db from "../db";
import Tag from "@/database/tag.model";

export async function createQuestion(params: any) {
  try {
    db.connect();
    console.log("params");
    const { title, content, tags, author, path } = params;
    // Create Question
    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];
    // Create the tags or get them if they are already exits
    for (const tag of tagDocuments) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { question: question._id } },
        { upsert: true, new: true }
      );
    }

    console.log(params);
  } catch (error) {
    console.log("erroras");
  }
}
