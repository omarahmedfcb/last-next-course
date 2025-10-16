import { User } from "@/lib/models/users";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const user = await User.findById(id);
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({ message: error.message }, { status: 404 });
  }
}
