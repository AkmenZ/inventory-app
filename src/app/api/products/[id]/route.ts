import { db } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

// UPDATE product
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const { id } = params;
  const body = await req.json();
  const product = body.product;

  // check if session exists
  if (!session) {
    return NextResponse.json(
      {
        error: "User is not authenticated",
      },
      { status: 401 }
    );
  }

  if (!product) {
    return NextResponse.json(
      { message: "Missing or invalid 'product' information" },
      { status: 400 }
    );
  }

  if (!id) {
    return NextResponse.json(
      { message: "Invalid ID provided" },
      { status: 400 }
    );
  }

  const result = await db.product.update({
    where: { id: id },
    data: {
      name: product.name,
      quantity: product.quantity,
      store: product.store,
    },
  });

  return NextResponse.json(result, { status: 200 });
}

// DELETE product
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const { id } = params;

  // check if session exists
  if (!session) {
    return NextResponse.json(
      {
        error: "User is not authenticated",
      },
      { status: 401 }
    );
  }

  if (!id) {
    return NextResponse.json(
      { message: "Invalid ID provided" },
      { status: 400 }
    );
  }

  const deleteResult = await db.product.delete({
    where: { id: id },
  });
  return NextResponse.json(
    { message: "Product successfully deleted", data: deleteResult },
    { status: 200 }
  );
}
