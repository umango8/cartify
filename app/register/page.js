"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      alert("Registration Successful ✅");
      router.push("/login");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white p-12">
        <h1 className="text-5xl font-bold mb-6">Join Cartify</h1>
        <p className="text-lg text-center max-w-md opacity-90">
          Create your account and start exploring a modern shopping experience.
        </p>
      </div>

      <div className="flex items-center justify-center bg-gray-50 p-8">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-10">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">
            Create Account 🚀
          </h2>

          <p className="text-gray-500 mb-6">
            Start your journey with Cartify
          </p>

          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="text-sm text-gray-600">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full mt-1 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full mt-1 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full mt-1 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full mt-1 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white py-3 rounded-lg transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-center mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[var(--color-primary)] font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
