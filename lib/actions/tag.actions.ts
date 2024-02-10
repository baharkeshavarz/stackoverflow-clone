"use server";

import { GetTopInteractedTagsParams } from "@/types/shared.types";
import db from "../db";
import User from "@/database/user.model";

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
