"use server";

import Question from "@/database/question.model";
import db from "../db";
import {
  CreateQuestionParams,
  DeleteQuestionParams,
  EditQuestionParams,
  GetQuestionByIdParams,
  GetQuestionParams,
  QuestionVoteParams
} from "./shared.types";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";
import Answer from "@/database/answer.model";
import Interaction from "@/database/interaction.model";
import { FilterQuery } from "mongoose";

export async function getQuestions(params: GetQuestionParams) {
  try {
    await db.connect();
    const { searchQuery, filter, page = 1, pageSize = 20 } = params;
    // Calculate the number of posts to skip based on the page number and page size
    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Question> = {};
    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { content: { $regex: new RegExp(searchQuery, "i") } }
      ];
    }

    // Filters
    let sortOptions = {};
    switch (filter) {
      case "newest":
        sortOptions = { createdAt: -1 };
        break;
      case "frequent":
        sortOptions = { views: -1 };
        break;
      case "unanswered":
        query.answers = { $size: 0 };
        break;
      default:
        break;
    }

    const questions = await Question.find(query)
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOptions);

    // Calculate if there is next page or not
    const totalQuestions = await Question.countDocuments(query);
    const isNext = totalQuestions > skipAmount + questions.length;

    return { questions, isNext };
  } catch (error) {
    console.log(error);
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    await db.connect();
    const { title, content, tags, author, path } = params;
    // Create Question
    const question = await Question.create({
      title,
      content,
      author
    });

    const tagDocuments = [];
    // Create the tags or get them if they are already exits
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTag);
    }

    // Add tags to inserted question
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } }
    });

    // Create and interaction record fot the user's ask_question action
    await Interaction.create({
      user: author,
      action: "ask_question",
      question: question._id,
      tags: tagDocuments
    });

    // Increment author's reputation by +5 for creating a question
    await User.findByIdAndUpdate(author, { $inc: { reputation: 5 } });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    await db.connect();
    const { questionId } = params;
    const question = await Question.findById(questionId)
      .populate({ path: "tags", model: Tag, select: "_id name" })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture"
      });

    return question;
  } catch (error) {
    console.log(error);
  }
}

export async function upvoteQuestion(params: QuestionVoteParams) {
  try {
    await db.connect();
    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};
    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId }
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true
    });

    if (!question) {
      throw new Error("Question not found");
    }
    // Increment author's reputation by +1/-1 for upvoting/revoking an upvote
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasupVoted ? -1 : 1 }
    });

    await User.findByIdAndUpdate(question.author, {
      $inc: { reputation: hasupVoted ? -10 : 10 }
    });

    revalidatePath(path);
  } catch (error) {
    console.log("error");
    throw error;
  }
}

export async function downvoteQuestion(params: QuestionVoteParams) {
  try {
    await db.connect();
    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};

    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId }
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true
    });

    if (!question) {
      throw new Error("Question not found");
    }

    // Increment author's reputation
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasdownVoted ? -2 : 2 }
    });

    await User.findByIdAndUpdate(question.author, {
      $inc: { reputation: hasdownVoted ? -10 : 10 }
    });

    revalidatePath(path);
  } catch (error) {
    console.log("error");
    throw error;
  }
}

export async function deleteQuestion(params: DeleteQuestionParams) {
  try {
    await db.connect();
    const { questionId, path } = params;
    await Question.deleteOne({ _id: questionId });
    await Answer.deleteMany({ question: questionId });
    await Interaction.deleteMany({ question: questionId });
    await Tag.updateMany(
      { question: questionId },
      {
        $pull: { questions: questionId }
      }
    );
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function editQuestion(params: EditQuestionParams) {
  try {
    await db.connect();
    const { questionId, title, content, path } = params;

    // Find Question
    const question = await Question.findById(questionId).populate("tags");
    if (!question) {
      throw new Error("Question not found");
    }

    // Edit Question
    question.title = title;
    question.content = content;
    await question.save();

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function getHotQuestions() {
  try {
    await db.connect();
    const hotQuestions = await Question.find({})
      .sort({
        views: -1,
        upvotes: -1
      })
      .limit(5);

    return hotQuestions;
  } catch (error) {
    console.log(error);
  }
}
