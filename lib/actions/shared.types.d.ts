import { Schema } from "mongoose";
import {IUser} from "@/database/user.model"

export interface GetQuestionParams {
    page?: number;
    pageSize?: number;
    searchQuery?: string;
    filter?: string;
}

export interface CreateQuestionParams {
    title: string;
    content: string;
    tags: string[],
    author: Schema.Types.ObjectId | IUser;
    path: string;
}