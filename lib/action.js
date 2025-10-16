"use server";

import { redirect } from "next/navigation";
import { User } from "./models/users";

export async function saveUser(formData) {
  let name = formData.get("name");
  let title = formData.get("title");
  let imageUrl = formData.get("imageUrl");
  await User.create({ name, title, imageUrl });
  redirect("/users");
}
