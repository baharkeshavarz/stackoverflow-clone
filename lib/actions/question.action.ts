import { connectToDatabase } from "../mongoose";

export async function createQuestion(params = {}) {
  try {
    connectToDatabase();
  } catch (error) {
    console.log("createQuestion failed", error);
  }
}
