import { Todo } from "@/lib/models/todos";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const todo = await Todo.findById(id);
    return NextResponse.json({ todo }, { status: 200 });
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({ message: error.message }, { status: 404 });
  }
}
