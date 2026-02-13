"use client";

import { useAuth } from "../../context/AuthContext";
import { useOrders } from "../../context/OrderContext";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { orders } = useOrders();
  const router = useRouter();

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold mb-8">
        My Profile
      </h1>

      {/* User Info Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Account Information
        </h2>

        <p className="mb-2">
          <span className="font-medium">Username:</span> {user.username}
        </p>

        <button
          onClick={() => {
            logout();
            router.push("/");
          }}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* Orders Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">
          My Orders
        </h2>

        {orders.length === 0 ? (
          <p className="text-gray-500">
            No orders yet.
          </p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="border-b py-4 text-sm"
            >
              <p className="font-medium">
                Order ID: {order.id}
              </p>
              <p>Total: ₹{order.total}</p>
              <p className="text-gray-500">
                {order.date}
              </p>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
