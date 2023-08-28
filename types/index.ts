import { Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  completed: boolean;
  tags: ITag["_id"][];
}

export interface ITag extends Document {
  name: string;
  color: string;
  count: number;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}
