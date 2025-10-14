import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema({
  title: String,
  author: String,
});

export const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);
