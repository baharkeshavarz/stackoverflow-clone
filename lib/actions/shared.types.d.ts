import { Schema } from "mongoose";
import { IUser } from "@/database/user.model";

export interface GetQuestionParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
}

export interface CreateQuestionParams {
  title: string;
  content: string;
  tags: string[];
  author: Schema.Types.ObjectId | IUser;
  path: string;
}

export interface GetQuestionByIdParams {
  questionId: string;
}

export interface JobFilterParams {
  query: string;
  page: string;
}

export interface CreateAnswerParams {
  author: string;
  question: string;
  content: string;
  path: string;
}

export interface GetAnswersParams {
  questionId: string;
  sortBy?: string;
  page?: number;
  pageSize?: number;
}
