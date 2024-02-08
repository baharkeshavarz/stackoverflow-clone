"use server";

import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
} from "@/types/shared.types";
import db from "../db";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";

export async function getUserById(params: any) {
  try {
    db.connect();
    const { userId } = params;

    // Find user
    const user = await User.findOne({
      clerckId: userId,
    });
    return user;
  } catch (error) {
    console.log("error");
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    db.connect();

    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.log("error");
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    db.connect();

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
    db.connect();

    const { clerkId } = params;
    const user = await User.findOneAndDelete({ clerkId });
    if (!user) {
      throw new Error("User not found");
    }

    // delete all questions, answers, comments, etc.

    // get user quesions ids
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
