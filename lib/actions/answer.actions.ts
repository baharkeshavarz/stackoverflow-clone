"use server";

import Answer from "@/database/anwser.model";
import db from "../db";
import { CreateAnswerParams } from "./shared.types";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";

export async function createAnswer(params: CreateAnswerParams) {
    try {
      db.connect();

      const { content, author, question, path } = params;
      const newAnswer = new Answer({content, author, question });
      console.log({newAnswer});

      // Add the answer to the question's answers array
      await Question.findByIdAndUpdate(question, {
        $push: { answers: newAnswer._id }
      });

      revalidatePath(path);
    } catch (error) {
      console.log(error);
    }
  }