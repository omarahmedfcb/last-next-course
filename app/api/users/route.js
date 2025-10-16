import { connectToDatabase } from "@/lib/dbConnection";
import { User } from "@/lib/models/users";
import { NextResponse } from "next/server";

connectToDatabase();
export async function GET() {
  try {
    const users = await User.find();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({ message: error.message }, { status: 404 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newUser = await User.create(body);
    return NextResponse.json(newUser, { status: 201 });
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

    const deletedUser = await User.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "User deleted successfully", deletedUser },
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
    const { title, name } = body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { title, name },
      { new: true }
    );

    return NextResponse.json(
      { message: "User updated successfully", updatedUser },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
