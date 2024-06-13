"use server";

import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUserParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  GetUserStatsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "@/types/shared.types";
import db from "../db";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";
import Answer from "@/database/answer.model";
import { FilterQuery } from "mongoose";

export async function getUserById(params: any) {
  try {
    await db.connect();
    const { userId } = params;

    // Find user
    const user = await User.findOne({
      clerkId: userId,
    });
    return user;
  } catch (error) {
    console.log("error");
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    await db.connect();

    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.log("error");
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    await db.connect();
    const { clerkId, updateData, path } = params;
    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });
    revalidatePath(path);
  } catch (error) {
    console.log("error");
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    await db.connect();

    const { clerkId } = params;
    const user = await User.findOneAndDelete({ clerkId });
    if (!user) {
      throw new Error("User not found");
    }

    // delete all questions, answers, comments, etc.

    // get user questions ids
    // const userQuestionIds = await Question.find({ author: user._id }).distinct(
    //   "_id"
    // );

    // delete user questions
    await Question.deleteMany({ author: user._id });

    // TODO: delete user answers, comments and .etc

    const deleteUser = await User.findByIdAndDelete(user._id);
    return deleteUser;
  } catch (error) {
    console.log("error");
    throw error;
  }
}

export async function getAllUsers(params: GetAllUserParams) {
  try {
    await db.connect();
    const { searchQuery, filter, page = 1, pageSize = 1 } = params;
    // Calculate the number of posts to skip based on the page number and page size
    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof User> = {};

    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { username: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    // Apply filters
    let sortOptions = {};
    switch (filter) {
      case "new_users":
        sortOptions = { joinedAt: -1 };
        break;

      case "old_users":
        sortOptions = { joinedAt: 1 };
        break;

      case "top_contributors":
        sortOptions = { reputation: -1 };
        break;

      default:
        break;
    }

    const users = await User.find(query)
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOptions);

    // Calculate if there is next page or not
    const totalUsers = await User.countDocuments(query);
    const isNext = totalUsers > skipAmount + users.length;

    return { users, isNext };
  } catch (error) {
    console.log("error");
    throw error;
  }
}

export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    await db.connect();
    const { userId, questionId, path } = params;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Usr not found");
    }

    const isQuestionSaved = user.saved.includes(questionId);
    if (isQuestionSaved) {
      // remove question from saved
      await User.findByIdAndUpdate(
        userId,
        { $pull: { saved: questionId } },
        { new: true }
      );
    } else {
      // add question to saved
      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { saved: questionId } },
        { new: true }
      );
    }

    revalidatePath(path);
  } catch (error) {
    console.log("error");
    throw error;
  }
}

export async function getSavedQuestions(params: GetSavedQuestionsParams) {
  try {
    await db.connect();
    const { clerkId, filter, page = 1, pageSize = 10, searchQuery } = params;

    const query: FilterQuery<typeof User> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};

    // Apply filters
    let sortOptions = {};
    switch (filter) {
      case "most_recent":
        sortOptions = { createdAt: -1 };
        break;

      case "oldest":
        sortOptions = { createdAt: 1 };
        break;

      case "most_voted":
        sortOptions = { upvotes: -1 };
        break;

      case "most_viewed":
        sortOptions = { views: -1 };
        break;

      case "most_answered":
        sortOptions = { answers: -1 };
        break;

      default:
        break;
    }

    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      match: query,
      options: {
        sort: sortOptions,
        skip: (page - 1) * pageSize,
        limit: pageSize,
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if (!user) {
      throw new Error("User not found");
    }

    const savedQuestions = user.saved;
    return { questions: savedQuestions };
  } catch (error) {
    console.log("error");
    throw error;
  }
}

export async function getUserInfo(params: GetUserByIdParams) {
  try {
    await db.connect();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      throw new Error("User not found");
    }

    // Find related data to user
    const totalQuestions = await Question.countDocuments({ author: user._id });
    const totalAnswers = await Answer.countDocuments({ author: user._id });

    return { user, totalQuestions, totalAnswers };
  } catch (error) {
    console.log("error");
    throw error;
  }
}

export async function getUserQuestions(params: GetUserStatsParams) {
  try {
    await db.connect();
    const { userId } = params;
    //, page = 1, pageSize = 10
    const totalQuestions = await Question.countDocuments({ author: userId });
    const userQuestions = await Question.find({ author: userId })
      .sort({ views: -1, upvotes: -1 })
      .populate("tags", "_id name")
      .populate("author", "_id clerkId name picture");
    return { totalQuestions, questions: userQuestions };
  } catch (error) {
    console.log("error");
    throw error;
  }
}

export async function getUserAnswers(params: GetUserStatsParams) {
  try {
    await db.connect();
    const { userId } = params;
    //, page = 1, pageSize = 10
    const totalAnswers = await Answer.countDocuments({ author: userId });
    const userAnswers = await Answer.find({ author: userId })
      .sort({ upvotes: -1 })
      .populate("question", "_id title")
      .populate("author", "_id clerkId name picture");
    return { totalAnswers, answers: userAnswers };
  } catch (error) {
    console.log("error");
    throw error;
  }
}
