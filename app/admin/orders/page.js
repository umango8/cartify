"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import PageNavigation from "@/components/ui/Pagenation";

export default function AdminOrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "admin") return;

    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");
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

  const updateStatus = async (orderId, status) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? { ...order, status }
            : order
        )
      );

    } catch (error) {
      console.log(error);
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="text-center mt-20 text-red-500 font-semibold">
        Access Denied 🚫
      </div>
    );
  }

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-12 space-y-6">
         <PageNavigation
                previous="/"
                next="/cart"
              />
      <h1 className="text-3xl font-bold">
        Manage Orders
      </h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">
                Order ID: {order._id}
              </p>
              <p className="text-sm text-gray-500">
                User: {order.user?.email}
              </p>
            </div>

            <select
              value={order.status}
              onChange={(e) =>
                updateStatus(order._id, e.target.value)
              }
              className="border px-3 py-1 rounded-lg"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="font-bold">
            Total: ₹{order.totalAmount}
          </div>
        </div>
      ))}
    </div>
  );
}
