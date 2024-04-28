import { db } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";

// GET all products
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  // check if session exists
  if (!session) {
    console.log("no user triggered");
    return NextResponse.json(
      {
        error: "User is not authenticated",
      },
      { status: 401 }
    );
  }

  // check if user is admin
  if (session.user.role !== "admin") {
    console.log("no admin triggered");
    return NextResponse.json(
      {
        error: "Unauthorized access: User does not have admin privileges.",
      },
      { status: 403 }
    );
  }

  try {
    const products = await db.product.findMany({});

    if (products.length === 0) {
      return NextResponse.json(
        { message: "No products found!" },
        { status: 404 }
      );
    }

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something is wrong mate!" },
      { status: 500 }
    );
  }
}
