import mongoose from "mongoose";
import { ITag } from "../types";

const tagSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true, lowercase: true },
  color: { type: String, required: true },
  count: { type: Number, required: true, default: 0 },
});

const Tag = mongoose.model<ITag>("Tag", tagSchema);

export default Tag;
