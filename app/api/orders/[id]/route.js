import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function PUT(req, context) {
  try {
    await connectDB();

    const { id } = await context.params;

    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json(
        { message: "Order not found" },
        { status: 404 }
      );
    }

    if (order.status !== "pending") {
      return NextResponse.json(
        { message: "Only pending orders can be cancelled" },
        { status: 400 }
      );
    }

    order.status = "cancelled";
    await order.save();

    return NextResponse.json(order, { status: 200 });

  } catch (error) {
    console.log("Cancel Error:", error);

    return NextResponse.json(
      { message: "Failed to cancel order" },
      { status: 500 }
    );
  }
}
export async function PATCH(req, context) {
  try {
    await connectDB();

    const { id } = await context.params;
    const { status } = await req.json();

    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json(
        { message: "Order not found" },
        { status: 404 }
      );
    }

    order.status = status;
    await order.save();

    return NextResponse.json(order, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to update status" },
      { status: 500 }
    );
  }
}
