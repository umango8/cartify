import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";
// ✅ CREATE ORDER
export async function POST(req) {
  try {
    await connectDB();

    const { userId, items, totalAmount } = await req.json();

    if (!userId || !items || items.length === 0) {
      return NextResponse.json(
        { message: "Invalid order data" },
        { status: 400 }
      );
    }

    const order = await Order.create({
      user: userId,
      items,
      totalAmount,
    });

    return NextResponse.json(order, { status: 201 });

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to create order" },
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

    if (userId) {
      // Normal user → only their orders
      orders = await Order.find({ user: userId })
        .populate("user")
        .populate("items.product")
        .sort({ createdAt: -1 });
    } else {
      // Admin → get all orders
      orders = await Order.find()
        .populate("user")
        .populate("items.product")
        .sort({ createdAt: -1 });
    }

    return NextResponse.json(orders);

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

