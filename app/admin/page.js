"use client";

import PageNavigation from "@/components/ui/Pagenation";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";

export default function AdminPage() {
  const { user } = useAuth();

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7]">
        <p className="text-red-500 font-semibold text-lg">
          Access Denied 🚫
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7]">

      {/* Top Navigation */}
      <PageNavigation next={null} />

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Heading */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Manage your store efficiently
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 
                        grid-cols-1 
                        sm:grid-cols-2 
                        lg:grid-cols-3">

          {/* Products */}
          <Link
            href="/admin/products"
            className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <h2 className="text-xl font-semibold mb-3 group-hover:text-black">
              Manage Products
            </h2>
            <p className="text-gray-500 text-sm">
              Add, edit, and delete products in your store.
            </p>
          </Link>

          {/* Orders */}
          <Link
            href="/admin/orders"
            className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <h2 className="text-xl font-semibold mb-3 group-hover:text-black">
              Manage Orders
            </h2>
            <p className="text-gray-500 text-sm">
              Track and update customer orders.
            </p>
          </Link>

          {/* Users */}
          <Link
            href="/admin/users"
            className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <h2 className="text-xl font-semibold mb-3 group-hover:text-black">
              Manage Users
            </h2>
            <p className="text-gray-500 text-sm">
              View and manage registered users.
            </p>
          </Link>

        </div>

      </div>
    </div>
  );
}
