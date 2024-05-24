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

export interface QuestionVoteParams {
  questionId: string;
  userId: string;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  path: string;
}

export interface AnswerVoteParams {
  answerId: string;
  userId: string;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  path: string;
}

export interface ViewQuestionParams {
  questionId: string;
  userId: string | undefined;
}

export interface DeleteQuestionParams {
  questionId: string;
  path: string;
}

export interface DeleteAnswerParams {
  answerId: string;
  path: string;
}

export interface EditQuestionParams {
  questionId: string;
  title: string;
  content: string;
  path: string;
}
