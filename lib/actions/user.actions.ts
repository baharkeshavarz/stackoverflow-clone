"use server";

import db from "../db";
import User from "@/database/user.model";

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
  }
}
