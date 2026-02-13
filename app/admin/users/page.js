"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

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
    <div className="max-w-6xl mx-auto mt-12 space-y-6">
      <h1 className="text-3xl font-bold">
        Manage Users
      </h1>

      {users.map((u) => (
        <div
          key={u._id}
          className="bg-white p-6 rounded-xl shadow-md flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">
              {u.username}
            </p>
            <p className="text-gray-500">
              {u.email}
            </p>
          </div>

          <div className="flex items-center gap-4">

            <select
              value={u.role}
              onChange={(e) =>
                updateUser(u._id, "role", e.target.value)
              }
              className="border px-2 py-1 rounded"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <button
              onClick={() =>
                updateUser(u._id, "isBlocked", !u.isBlocked)
              }
              className={`px-3 py-1 rounded ${
                u.isBlocked
                  ? "bg-green-500 text-white"
                  : "bg-yellow-500 text-white"
              }`}
            >
              {u.isBlocked ? "Unblock" : "Block"}
            </button>

            <button
              onClick={() => deleteUser(u._id)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>

          </div>
        </div>
      ))}
    </div>
  );
}
