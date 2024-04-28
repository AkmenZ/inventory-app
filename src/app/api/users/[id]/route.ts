import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// mongoDB ObjectID validation
function isValidObjectId(id: string) {
    return /^[0-9a-fA-F]{24}$/.test(id);
}

// GET user by id
export async function GET(req: Request) {
  try {
    // get the ID from the URL
    const { pathname } = new URL(req.url);
    const id = pathname.split("/").pop();

    if (!id || !isValidObjectId(id)) {
      return NextResponse.json(
        { message: "Invalid ID provided" },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
