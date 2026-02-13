"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Orders
  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
      const res = await fetch(
  `/api/orders?userId=${user.id}`,
  {
    method: "GET",
    cache: "no-store",
  }
);


        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  // Cancel Order
  const cancelOrder = async (orderId) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      // Update UI instantly
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? { ...order, status: "cancelled" }
            : order
        )
      );

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  if (!user) {
    return (
      <p className="text-center mt-10">
        Please login to see your orders.
      </p>
    );
  }

  if (loading) {
    return (
      <p className="text-center mt-10">
        Loading orders...
      </p>
    );
  }

  if (orders.length === 0) {
    return (
      <p className="text-center mt-10">
        No orders found.
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold mb-6">
        My Orders
      </h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white shadow-md rounded-xl p-6"
        >
          {/* Header */}
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">
                Order ID: {order._id}
              </p>
              <p className="text-sm text-gray-500">
                Date:{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            <span
              className={`text-sm px-3 py-1 rounded-full capitalize ${
                order.status === "cancelled"
                  ? "bg-red-100 text-red-600"
                  : order.status === "delivered"
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {order.status}
            </span>
          </div>

          {/* Items */}
          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium">
                    {item.product?.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold">
                  ₹{item.product?.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center mt-4">
            <div className="font-bold">
              Total: ₹{order.totalAmount}
            </div>

            {order.status === "pending" && (
              <button
                onClick={() => cancelOrder(order._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
