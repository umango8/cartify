"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import PageNavigation from "@/components/ui/Pagenation";

export default function AdminUsersPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    if (user.role !== "admin") {
      router.push("/");
      return;
    }

    fetchUsers();
  }, [user]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users", { cache: "no-store" });
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id, field, value) => {
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });

      if (!res.ok) return;

      setUsers((prev) =>
        prev.map((u) =>
          u._id === id ? { ...u, [field]: value } : u
        )
      );

    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) return;

      setUsers((prev) =>
        prev.filter((u) => u._id !== id)
      );

    } catch (error) {
      console.log(error);
    }
  };

  if (!user) return null;

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

 return (
  <div className="min-h-screen bg-[#f5f5f7]">

    <PageNavigation previous="/" next={null} />

    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Manage Users
        </h1>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Control user roles and access
        </p>
      </div>

      {/* Users List */}
      <div className="space-y-6">

        {users.map((u) => (
          <div
            key={u._id}
            className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 
                       flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >

            {/* User Info */}
            <div>
              <p className="font-semibold text-lg">
                {u.username}
              </p>
              <p className="text-gray-500 text-sm">
                {u.email}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">

              {/* Role Select */}
              <select
                value={u.role}
                onChange={(e) =>
                  updateUser(u._id, "role", e.target.value)
                }
                className="px-3 py-2 rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>

              {/* Block / Unblock */}
              <button
                onClick={() =>
                  updateUser(u._id, "isBlocked", !u.isBlocked)
                }
                className={`px-4 py-2 rounded-full text-sm transition ${
                  u.isBlocked
                    ? "bg-green-500 text-white hover:opacity-90"
                    : "bg-yellow-500 text-white hover:opacity-90"
                }`}
              >
                {u.isBlocked ? "Unblock" : "Block"}
              </button>

              {/* Delete */}
              <button
                onClick={() => deleteUser(u._id)}
                className="px-4 py-2 rounded-full bg-red-500 text-white text-sm hover:opacity-90 transition"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  </div>
);

}
