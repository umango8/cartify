import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";


// ✅ GET ALL PRODUCTS
export async function GET() {
  try {
    await connectDB();

    const products = await Product.find().sort({ createdAt: -1 });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}


// ✅ ADD NEW PRODUCT
export async function POST(req) {
  try {
    await connectDB();

    const {
      title,
      price,
      description,
      images,
      category,
      stock,
      isFeatured,
      isTrending,
    } = await req.json();

    if (!title || !price || !description || !images || images.length < 1) {
      return NextResponse.json(
        { message: "Required fields missing" },
        { status: 400 }
      );
    }

    const newProduct = await Product.create({
      title,
      price,
      description,
      images,
      category,
      stock,
      isFeatured,
      isTrending,
    });

    return NextResponse.json(newProduct, { status: 201 });

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 }
    );
  }
}
