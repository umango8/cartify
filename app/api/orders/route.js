import connectDB from "@/lib/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Product from "@/models/Product";

// ✅ CREATE ORDER
export async function POST(req) {
  try {
    await connectDB();

    const { userId, items } = await req.json();

    if (!userId || !items || items.length === 0) {
      return NextResponse.json(
        { message: "Invalid order data" },
        { status: 400 }
      );
    }

    let totalAmount = 0;

    // ✅ Validate stock
    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return NextResponse.json(
          { message: "Product not found" },
          { status: 404 }
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          { message: `${product.name} is out of stock` },
          { status: 400 }
        );
      }

      totalAmount += product.price * item.quantity;
    }

    // ✅ Reduce stock
    for (const item of items) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: -item.quantity } }
      );
    }

    const order = await Order.create({
      user: userId,
      items,
      totalAmount,
      status: "pending",
    });

    return NextResponse.json(order, { status: 201 });

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Order failed" },
      { status: 500 }
    );
  }
}



// ✅ GET USER ORDERS


export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    let orders;

    // ✅ If userId exists → return user orders
    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      orders = await Order.find({
        user: new mongoose.Types.ObjectId(userId),
      })
        .populate("items.product")
        .sort({ createdAt: -1 });

    } else {
      // ✅ If no userId → return ALL orders (Admin)
      orders = await Order.find()
        .populate("user", "username email")
        .populate("items.product")
        .sort({ createdAt: -1 });
    }

    return NextResponse.json(orders);

  } catch (error) {
    console.log("GET ORDERS ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}



