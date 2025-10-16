import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: String,
  title: String,
  imageUrl: String,
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
