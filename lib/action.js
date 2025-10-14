"use server";

import { redirect } from "next/navigation";
import { Todo } from "./models/todos";

export async function saveTodo(formData) {
  let title = formData.get("title");
  let author = formData.get("author");

  await Todo.create({ title, author });
  redirect("/todos");
}
