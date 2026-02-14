import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";


// ✅ GET ALL PRODUCTS
// export async function GET() {
//   try {
//     await connectDB();

//     const products = await Product.find().sort({ createdAt: -1 });

//     return NextResponse.json(products, { status: 200 });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       { message: "Failed to fetch products" },
//       { status: 500 }
//     );
//   }
// }
// ✅ GET PRODUCTS WITH PAGINATION
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 12;

    const skip = (page - 1) * limit;

    const products = await Product.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments();

    return NextResponse.json(
      {
        products,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      },
      { status: 200 }
    );

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
