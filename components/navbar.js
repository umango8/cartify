"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState, useRef } from "react";

export default function Navbar() {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();

  const [animate, setAnimate] = useState(false);
const [mobileOpen, setMobileOpen] = useState(false);
const [dropdownOpen, setDropdownOpen] = useState(false);


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
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

return (
  <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">

      {/* Logo */}
      <Link href="/" className="text-xl sm:text-2xl font-semibold tracking-tight">
        Cartify
      </Link>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-700">

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
        <Link href="/cart" className="relative hover:opacity-60 transition">
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

        {/* Auth Dropdown */}
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 hover:opacity-70 transition"
            >
              Namaste, {user.username}
              <span className="text-xs">▾</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-4 w-48 bg-white rounded-2xl 
              shadow-xl p-2 animate-in fade-in zoom-in-95 duration-150">

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

      {/* Hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden relative w-8 h-8 flex flex-col justify-center items-center"
      >
        <span
          className={`absolute w-6 h-0.5 bg-black transition-all duration-300 
          ${mobileOpen ? "rotate-45" : "-translate-y-2"}`}
        ></span>

        <span
          className={`absolute w-6 h-0.5 bg-black transition-all duration-300 
          ${mobileOpen ? "opacity-0" : ""}`}
        ></span>

        <span
          className={`absolute w-6 h-0.5 bg-black transition-all duration-300 
          ${mobileOpen ? "-rotate-45" : "translate-y-2"}`}
        ></span>
      </button>
    </div>

    {/* Overlay */}
    {mobileOpen && (
      <div
        onClick={() => setMobileOpen(false)}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden"
      ></div>
    )}

    {/* Mobile Menu */}
    <div
      className={`lg:hidden fixed top-[72px] left-0 w-full bg-white 
      shadow-xl transition-all duration-300 ease-in-out
      ${mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0 pointer-events-none"}
      `}
    >
      <div className="px-6 py-6 space-y-5 text-sm font-medium text-gray-700">

        <Link href="/" onClick={() => setMobileOpen(false)} className="block">
          Home
        </Link>

        <Link href="/products" onClick={() => setMobileOpen(false)} className="block">
          Products
        </Link>

        <Link href="/orders" onClick={() => setMobileOpen(false)} className="block">
          My Orders
        </Link>

        <Link href="/cart" onClick={() => setMobileOpen(false)} className="block">
          Cart {totalItems > 0 && `(${totalItems})`}
        </Link>

        {user ? (
          <>
            <Link href="/profile" onClick={() => setMobileOpen(false)} className="block">
              My Profile
            </Link>

            <button
              onClick={() => {
                logout();
                setMobileOpen(false);
              }}
              className="block text-left text-red-500"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/login"
            onClick={() => setMobileOpen(false)}
            className="block bg-black text-white px-4 py-2 rounded-lg text-center"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  </nav>
);

}
