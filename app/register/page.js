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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      setError("Please fill all fields.");
      setLoading(false);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
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
        setError(data.message || "Registration failed.");
        setLoading(false);
        return;
      }

      router.push("/login");
    } catch (err) {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7] px-6">
      <div className="w-full max-w-md">

        <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-10">
          
          <h2 className="text-3xl font-semibold tracking-tight text-center">
            Create Account
          </h2>

          <p className="text-center text-gray-500 mt-2 text-sm">
            Join Cartify and start shopping
          </p>

          <form onSubmit={handleRegister} className="mt-8 space-y-5">

            {/* Username */}
            <div>
              <label className="text-sm text-gray-600">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="john_doe"
                className={`w-full mt-2 px-4 py-3 rounded-xl bg-gray-100 
                focus:bg-white border transition-all duration-300
                ${error ? "border-red-500 focus:border-red-500" : "border-transparent focus:border-black"}`}
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full mt-2 px-4 py-3 rounded-xl bg-gray-100 
                focus:bg-white border transition-all duration-300
                ${error ? "border-red-500 focus:border-red-500" : "border-transparent focus:border-black"}`}
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full mt-2 px-4 py-3 rounded-xl bg-gray-100 
                focus:bg-white border transition-all duration-300
                ${error ? "border-red-500 focus:border-red-500" : "border-transparent focus:border-black"}`}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm text-gray-600">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full mt-2 px-4 py-3 rounded-xl bg-gray-100 
                focus:bg-white border transition-all duration-300
                ${error ? "border-red-500 focus:border-red-500" : "border-transparent focus:border-black"}`}
              />

              {/* Error Message */}
              {error && (
                <p className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-black text-white py-3 rounded-full font-medium 
              hover:opacity-90 hover:scale-[1.02] transition-all duration-300
              disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <div className="my-8 flex items-center">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="px-4 text-sm text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-black hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
