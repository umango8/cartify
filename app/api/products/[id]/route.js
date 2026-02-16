import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

// ============================
// 🔐 ADMIN AUTH FUNCTION
// ============================
function verifyAdmin(req) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { error: "Unauthorized" };
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return { error: "Access denied" };
    }

    return { user: decoded };
  } catch (err) {
    return { error: "Invalid token" };
  }
}

// ============================
// ✅ GET PRODUCT BY ID
// ============================
export async function GET(req, context) {
  try {
    await connectDB();

    const { id } = context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid product ID" },
        { status: 400 }
      );
    }

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });

  } catch (error) {
    console.error("GET PRODUCT ERROR:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

// ============================
// ❌ DELETE PRODUCT (ADMIN)
// ============================
export async function DELETE(req, context) {
  try {
    await connectDB();

    const auth = verifyAdmin(req);
    if (auth.error) {
      return NextResponse.json(
        { message: auth.error },
        { status: 401 }
      );
    }

    const { id } = context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid product ID" },
        { status: 400 }
      );
    }

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    await product.deleteOne();

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    return NextResponse.json(
      { message: "Delete failed" },
      { status: 500 }
    );
  }
}

// ============================
// ✏ UPDATE PRODUCT (ADMIN)
// ============================
export async function PUT(req, context) {
  try {
    await connectDB();

    const auth = verifyAdmin(req);
    if (auth.error) {
      return NextResponse.json(
        { message: auth.error },
        { status: 401 }
      );
    }

    const { id } = context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid product ID" },
        { status: 400 }
      );
    }

    const body = await req.json();

    // ✅ Whitelisted fields only
    const {
      name,
      price,
      description,
      category,
      stock,
      images,
      featured,
    } = body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        description,
        category,
        stock,
        images,
        featured,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProduct, { status: 200 });

  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    return NextResponse.json(
      { message: "Update failed" },
      { status: 500 }
    );
  }
}
