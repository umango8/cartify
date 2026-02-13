"use client";

import { useAuth } from "../../context/AuthContext";
import Link from "next/link";

export default function AdminPage() {
  const { user } = useAuth();

  if (!user || user.role !== "admin") {
    return (
      <div className="text-center mt-20 text-red-500 font-semibold">
        Access Denied 🚫
      </div>
    );
  }
else{
 return (
    <div className="max-w-5xl mx-auto mt-12 space-y-8">
      <h1 className="text-3xl font-bold">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <Link
          href="/admin/products"
          className="bg-white shadow-md p-6 rounded-xl hover:shadow-xl transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            Manage Products
          </h2>
          <p className="text-gray-500 text-sm">
            Add, edit, delete products
          </p>
        </Link>

        <Link
          href="/admin/orders"
          className="bg-white shadow-md p-6 rounded-xl hover:shadow-xl transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            Manage Orders
          </h2>
          <p className="text-gray-500 text-sm">
            Update order status
          </p>
        </Link>

        <Link
          href="/admin/users"
          className="bg-white shadow-md p-6 rounded-xl hover:shadow-xl transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            Manage Users
          </h2>
          <p className="text-gray-500 text-sm">
            View and manage users
          </p>
        </Link>

      </div>
    </div>
  );
}
 
}
