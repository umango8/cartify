"use client";

import PageNavigation from "@/components/ui/Pagenation";
import { useAuth } from "../../context/AuthContext";
import { useOrders } from "../../context/OrderContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { orders } = useOrders();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className=" bg-[#f5f5f7] py-8 px-6">
         <PageNavigation
                previous="/"
                next="/cart"
              />
      <div className="max-w-5xl mx-auto">

        {/* Page Title */}
        <h1 className="text-4xl font-semibold tracking-tight mb-14">
          My Profile
        </h1>

        {/* Account Card */}
        <div className="bg-white rounded-3xl p-10 shadow-[0_15px_50px_rgba(0,0,0,0.05)] mb-12">

          <h2 className="text-2xl font-medium mb-6">
            Account Information
          </h2>

          <div className="space-y-4 text-gray-700">
            <p>
              <span className="text-gray-500">Username</span><br />
              <span className="text-lg font-medium">{user.username}</span>
            </p>

            <p>
              <span className="text-gray-500">Email</span><br />
              <span className="text-lg font-medium">{user.email}</span>
            </p>
          </div>

          <button
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="mt-8 border border-black px-6 py-2.5 rounded-full 
            text-black hover:bg-black hover:text-white transition"
          >
            Logout
          </button>
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-3xl p-10 shadow-[0_15px_50px_rgba(0,0,0,0.05)]">

          <h2 className="text-2xl font-medium mb-8">
            Order History
          </h2>

          {orders.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                You haven’t placed any orders yet.
              </p>

              <button
                onClick={() => router.push("/products")}
                className="mt-6 bg-black text-white px-8 py-3 rounded-full hover:opacity-90 transition"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center mb-3">
                    <p className="font-medium">
                      Order #{order._id.slice(-6)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <p className="text-gray-700">
                    Total: <span className="font-medium">₹{order.total}</span>
                  </p>

                  <p className="text-sm text-gray-500 mt-2">
                    Status: {order.status}
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
