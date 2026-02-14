"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import PageNavigation from "@/components/ui/Pagenation";


export default function OrdersPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 useEffect(() => {
  if (!user) return;

  const fetchOrders = async () => {
    try {
      const res = await fetch(`/api/orders?userId=${user.id}`, {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to load orders.");
        setOrders([]);  // ✅ important
        return;
      }

      setOrders(Array.isArray(data) ? data : []); // ✅ safety
    } catch (err) {
      console.log(err);
      setError("Failed to load orders.");
      setOrders([]); // ✅ safety
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();
}, [user]);


  const cancelOrder = async (orderId) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? { ...order, status: "cancelled" }
            : order
        )
      );
    } catch (err) {
      console.log(err);
      setError("Something went wrong.");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7]">
        <p className="text-gray-600 text-lg">
          Please login to view your orders.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7]">
        <p className="text-gray-500 text-lg">Loading orders...</p>
      </div>
    );
  }

return (
  <div className="bg-[#f5f5f7] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
    
    <PageNavigation previous="/" next="/cart" />

    <div className="max-w-5xl mx-auto">

      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight mb-10 sm:mb-14">
        My Orders
      </h1>

      {error && (
        <p className="mb-6 text-sm text-red-500">
          {error}
        </p>
      )}

      {orders.length === 0 ? (
        <div className="text-center py-14 sm:py-20 bg-white rounded-2xl sm:rounded-3xl shadow-sm">
          <p className="text-gray-600 text-base sm:text-lg">
            You haven’t placed any orders yet.
          </p>
          <button
            onClick={() => router.push("/products")}
            className="mt-6 bg-black text-white px-6 sm:px-8 py-3 rounded-full hover:opacity-90 transition"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="space-y-8 sm:space-y-10">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 
              shadow-[0_15px_50px_rgba(0,0,0,0.05)]"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Order #{order._id.slice(-6)}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <span
                  className={`text-xs px-4 py-1 rounded-full capitalize w-fit ${
                    order.status === "cancelled"
                      ? "bg-gray-200 text-gray-600"
                      : order.status === "delivered"
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Items */}
              <div className="space-y-4">
                {order.items.map((item) => {
                  const price = Number(item.product?.price || 0);
                  const total = price * item.quantity;

                  return (
                    <div
                      key={item._id}
                      className="flex justify-between items-start sm:items-center 
                      border-b border-gray-100 pb-3"
                    >
                      <div>
                        <p className="font-medium text-black text-sm sm:text-base">
                          {item.product?.name || "Product"}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <p className="font-medium text-sm sm:text-base">
                        ₹{total}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-6">
                <p className="text-base sm:text-lg font-medium">
                  Total: ₹{order.totalAmount}
                </p>

                {order.status === "pending" && (
                  <button
                    onClick={() => cancelOrder(order._id)}
                    className="border border-black px-5 py-2 rounded-full text-sm 
                    hover:bg-black hover:text-white transition w-fit"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  </div>
);

}
