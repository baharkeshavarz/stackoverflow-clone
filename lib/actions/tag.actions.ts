"use server";

import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "@/types/shared.types";
import db from "../db";
import User from "@/database/user.model";
import Tag from "@/database/tag.model";
import { FilterQuery } from "mongoose";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    db.connect();
    const { userId } = params;

    // find user
    const user = User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Find interactions for the use and group by tags
    // read from Interactions in db
    return [
      { _id: "1", name: "tag1" },
      { _id: "2", name: "tag2" },
      { _id: "3", name: "tag3" },
    ];
  } catch (error) {
    console.log("error");
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    db.connect();
    const { searchQuery } = params;
    const query: FilterQuery<typeof User> = {};

    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    }
    const tags = await Tag.find(query);
    return { tags };
  } catch (error) {
    console.log("error");
    throw error;
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    db.connect();
    const { tagId, page = 1, pageSize = 10, searchQuery } = params;
    const tagFilter = searchQuery ? { _id: tagId } : {};

    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
      options: {
        sort: { createdAt: -1 },
        skip: (page - 1) * pageSize,
        limit: pageSize,
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if (!tag) {
      throw new Error("Tag not found");
    }

    const questions = tag.questions;
    return { tagTitle: tag.name, questions };
  } catch (error) {
    console.log("error");
    throw error;
  }
}

export async function getPopularTags() {
  try {
    db.connect();
    const popularTags = await Tag.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: "$questions" } } },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 },
    ]);
    // we add numberOfQuestions to the tags object, it's not originally in tag document
    return popularTags;
  } catch (error) {
    console.log("error");
    throw error;
  }
}
