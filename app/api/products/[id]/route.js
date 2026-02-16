import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  try {
    await connectDB();

    // ✅ FIX for Next.js 16
    const { id } = await context.params;

    console.log("Received ID:", id);

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Invalid ID or server error" },
      { status: 500 }
    );
  }
}
export async function DELETE(req, context) {
  try {
    await connectDB();

    const { id } = await context.params;

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    await product.deleteOne();

    return NextResponse.json(
      { message: "Product deleted" },
      { status: 200 }
    );

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Delete failed" },
      { status: 500 }
    );
  }
}
export async function PUT(req, context) {
  try {
    await connectDB();

    const { id } = await context.params;
    const body = await req.json();

    const product = await Product.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Update failed" },
      { status: 500 }
    );
  }
}
