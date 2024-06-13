"use server";

import Answer from "@/database/answer.model";
import db from "../db";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  DeleteAnswerParams,
  GetAnswersParams,
} from "./shared.types";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";
import Interaction from "@/database/interaction.model";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    await db.connect();
    const { content, author, question, path } = params;
    const newAnswer = await Answer.create({ content, author, question });

    // Add the answer to the question's answers array
    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    await db.connect();
    const { questionId, sortBy, page = 1, pageSize = 10 } = params;
    // Calculate the number of posts to skip based on the page number and page size
    const skipAmount = (page - 1) * pageSize;

    // Apply filters
    let sortOptions = {};
    switch (sortBy) {
      case "highestUpvotes":
        sortOptions = { upvotes: -1 };
        break;

      case "lowestUpvotes":
        sortOptions = { upvotes: 1 };
        break;

      case "old":
        sortOptions = { createdAt: -1 };
        break;

      case "recent":
        sortOptions = { createdAt: 1 };
        break;

      default:
        break;
    }

    const answers = await Answer.find({ question: questionId })
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOptions);

    // Calculate if there is next page or not
    const totalAnswers = await Answer.countDocuments({ question: questionId });
    const isNext = totalAnswers > skipAmount + answers.length;

    return { answers, isNext };
  } catch (error) {
    console.log(error);
  }
}

export async function upvoteAnswer(params: AnswerVoteParams) {
  try {
    await db.connect();
    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};
    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found");
    }

    // Increment author's reputation
    revalidatePath(path);
  } catch (error) {
    console.log("error");
    throw error;
  }
}

export async function downvoteAnswer(params: AnswerVoteParams) {
  try {
    await db.connect();
    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};
    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found");
    }
    // Increment author's reputation
    revalidatePath(path);
  } catch (error) {
    console.log("error");
    throw error;
  }
}

export async function deleteAnswer(params: DeleteAnswerParams) {
  try {
    await db.connect();
    const { answerId, path } = params;

    const answer = await Answer.findById(answerId);
    if (!answer) {
      throw new Error("Answer not found");
    }

    await Answer.deleteOne({ _id: answerId });
    await Interaction.deleteMany({ answer: answerId });
    await Question.updateMany(
      { _id: answerId },
      {
        $pull: { answers: answerId },
      }
    );
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
