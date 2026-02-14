"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState, useRef } from "react";

export default function Navbar() {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();

  const [animate, setAnimate] = useState(false);
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  const totalItems = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  // Cart badge animation
  useEffect(() => {
    if (totalItems > 0) {
      setAnimate(true);
      const timeout = setTimeout(() => setAnimate(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [totalItems]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-semibold tracking-tight"
        >
          Cartify
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-8 text-sm font-medium text-gray-700">

          <Link href="/" className="hover:opacity-60 transition">
            Home
          </Link>

          <Link href="/products" className="hover:opacity-60 transition">
            Products
          </Link>

          <Link href="/orders" className="hover:opacity-60 transition">
            My Orders
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative hover:opacity-60 transition"
          >
            Cart
            {totalItems > 0 && (
              <span
                className={`absolute -top-2 -right-5 bg-black text-white text-xs 
                px-2 py-0.5 rounded-full transition-transform duration-300
                ${animate ? "scale-125" : "scale-100"}`}
              >
                {totalItems}
              </span>
            )}
          </Link>

          {/* Auth */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1 hover:opacity-70 transition"
              >
                Namaste, {user.username}
                <span className="text-xs">▾</span>
              </button>

              {open && (
                <div className="absolute right-0 mt-4 w-48 bg-white rounded-2xl 
                shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-2 animate-fadeIn">

                  <Link
                    href="/profile"
                    className="block px-4 py-2 rounded-xl hover:bg-gray-100 transition"
                  >
                    My Profile
                  </Link>

                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 rounded-xl 
                    hover:bg-gray-100 transition text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-black text-white px-5 py-2 rounded-full 
              hover:opacity-90 transition"
            >
              Login
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
}
