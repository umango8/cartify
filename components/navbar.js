"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();

  const [animate, setAnimate] = useState(false);
  const [open, setOpen] = useState(false);

  const totalItems = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  // Animate cart badge when count changes
  useEffect(() => {
    if (totalItems > 0) {
      setAnimate(true);
      const timeout = setTimeout(() => setAnimate(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [totalItems]);

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-[var(--color-primary)]"
        >
          Cartify
        </Link>

        {/* Right Section */}
       {/* Right Section */}
<div className="flex items-center gap-6 text-gray-700 font-medium">

  <Link
    href="/"
    className="hover:text-[var(--color-primary)] transition"
  >
    Home
  </Link>

  <Link
    href="/products"
    className="hover:text-[var(--color-primary)] transition"
  >
    Products
  </Link>

  {/* Cart */}
  <Link
    href="/cart"
    className="relative hover:text-[var(--color-primary)] transition"
  >
    Cart
    {totalItems > 0 && (
      <span
        className={`absolute -top-2 -right-4 bg-[var(--color-primary)] text-white text-xs px-2 py-0.5 rounded-full transition-transform duration-300 ${
          animate ? "scale-125" : "scale-100"
        }`}
      >
        {totalItems}
      </span>
    )}
  </Link>

  {/* Auth Section */}
  {user ? (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="hover:text-[var(--color-primary)] transition"
      >
        Namaste, {user.username} 👋
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-40 bg-white shadow-lg rounded-lg p-2 border">
          <Link
            href="/profile"
            className="block px-3 py-2 hover:bg-gray-100 rounded"
          >
            My Profile
          </Link>

          <button
            onClick={logout}
            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-red-500"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  ) : (
    <>
      <Link
        href="/login"
        className="hover:text-[var(--color-primary)] transition"
      >
        Login
      </Link>

      <Link
        href="/register"
        className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg hover:bg-[var(--color-primary-dark)] transition"
      >
        Sign Up
      </Link>
    </>
  )}

</div>

      </div>
    </nav>
  );
}
