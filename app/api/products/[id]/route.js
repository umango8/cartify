import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

// GET
export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Invalid ID or server error" },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted" });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}

// PUT
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const body = await req.json();

    const product = await Product.findByIdAndUpdate(id, body, { new: true });

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}
