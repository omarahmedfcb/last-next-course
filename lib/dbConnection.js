import mongoose from "mongoose";

export async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/lab3");
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log(error);
  }
}
