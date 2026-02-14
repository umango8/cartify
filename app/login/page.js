"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.message === "User not found") {
          setError("No account found. Please sign up first.");
        } else {
          setError("Invalid email or password.");
        }
        setLoading(false);
        return;
      }

      login(data.user, data.token);
      router.push("/");
    } catch (error) {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7] px-4 sm:px-6 lg:px-8 py-10">
    
    <div className="w-full max-w-md">

      <div className="bg-white rounded-2xl sm:rounded-3xl 
      shadow-[0_20px_60px_rgba(0,0,0,0.08)] 
      p-6 sm:p-8 lg:p-10">

        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-center">
          Welcome Back
        </h2>

        <p className="text-center text-gray-500 mt-2 text-sm">
          Sign in to continue to Cartify
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              className={`w-full mt-2 px-4 py-3 rounded-xl bg-gray-100 
              focus:bg-white border transition-all duration-300 
              text-sm sm:text-base
              ${error ? "border-red-500 focus:border-red-500" : "border-transparent focus:border-black"}`}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className={`w-full mt-2 px-4 py-3 rounded-xl bg-gray-100 
              focus:bg-white border transition-all duration-300 
              text-sm sm:text-base
              ${error ? "border-red-500 focus:border-red-500" : "border-transparent focus:border-black"}`}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            {error && (
              <p className="mt-2 text-sm text-red-500">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-black text-white py-3 sm:py-4 
            rounded-full text-sm sm:text-base font-medium 
            hover:opacity-90 hover:scale-[1.02] transition-all duration-300
            disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="my-8 flex items-center">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="px-4 text-sm text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-black hover:underline"
          >
            Sign up
          </Link>
        </p>

      </div>
    </div>
  </div>
);


}
