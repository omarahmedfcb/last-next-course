import { connectToDatabase } from "@/lib/dbConnection";
import { Todo } from "@/lib/models/todos";
import { NextResponse } from "next/server";

connectToDatabase();
export async function GET() {
  try {
    const todos = await Todo.find();
    return NextResponse.json({ todos }, { status: 200 });
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({ message: error.message }, { status: 404 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newTodo = await Todo.create(body);
    return NextResponse.json(newTodo, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const deletedTodo = await Todo.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Todo deleted successfully", deletedTodo },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const body = await request.json();
    const { title, author } = body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, author },
      { new: true }
    );

    return NextResponse.json(
      { message: "Todo updated successfully", updatedTodo },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
