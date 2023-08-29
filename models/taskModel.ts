import mongoose from "mongoose";
import { ITask } from "../types";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
});

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
