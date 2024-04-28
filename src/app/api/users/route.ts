import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import * as z from "zod";

// input validation schema
const userSchema = z.object({
  username: z.string().min(1, "Username is required").max(50),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be atleast 8 characters long")
    .max(50),
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  role: z.enum(["admin", "user"]),
});

// POST new user
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password, firstName, lastName, role } =
      userSchema.parse(body);

    // check if username already exists
    const existingUsername = await db.user.findUnique({
      where: { username: username },
    });
    if (existingUsername) {
      return NextResponse.json(
        { user: null, message: "Username already exists!" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.user.create({
      data: {
        username,
        password: hashedPassword,
        firstName,
        lastName,
        role,
      },
    });

    const { password: newUserPassword, ...userData } = newUser;

    return NextResponse.json(
      { user: userData, message: "User added successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something is wrong mate!" },
      { status: 500 }
    );
  }
}

// GET all users
export async function GET(req: Request) {
  try {
    const users = await db.user.findMany({
      // comment out to return everything
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });

    if (users.length === 0) {
      return NextResponse.json({ message: "No users found!" }, { status: 404 });
    }

    return NextResponse.json({ users }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "Something is wrong mate!" },
      { status: 500 }
    );
  }
}