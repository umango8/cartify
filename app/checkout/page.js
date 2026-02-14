"use client";

import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    setError("");

    if (!user) {
      setError("Please login to continue.");
      return;
    }

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);

    try {
      const orderItems = cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      }));
       console.log("USER OBJECT:", user);

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,

          items: orderItems,
          // totalAmount: total,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to place order.");
        setLoading(false);
        return;
      }

      clearCart();
      router.push("/orders");

    } catch (err) {
      console.log(err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className=" flex items-center justify-center bg-[#f5f5f7]">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-6">
            Your cart is empty.
          </p>
          <button
            onClick={() => router.push("/products")}
            className="bg-black text-white px-8 py-3 rounded-full hover:opacity-90 transition"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

return (
  <div className="min-h-screen bg-[#f5f5f7] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
    
    <div className="max-w-4xl mx-auto">

      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight mb-10 sm:mb-14">
        Checkout
      </h1>

      {/* Order Summary Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 
      shadow-[0_15px_50px_rgba(0,0,0,0.05)]">

        <h2 className="text-lg sm:text-xl lg:text-2xl font-medium mb-6 sm:mb-8">
          Order Summary
        </h2>

        {/* Items */}
        <div className="space-y-5 sm:space-y-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-start sm:items-center 
              border-b border-gray-100 pb-4"
            >
              <div>
                <p className="font-medium text-black text-sm sm:text-base">
                  {item.name}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Qty: {item.quantity}
                </p>
              </div>

              <p className="font-medium text-sm sm:text-base">
                ₹{item.price * item.quantity}
              </p>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex justify-between items-center mt-8 sm:mt-10 
        text-base sm:text-lg font-medium">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        {/* Error */}
        {error && (
          <p className="mt-6 text-sm text-red-500">
            {error}
          </p>
        )}

        {/* Button */}
        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="mt-8 w-full bg-black text-white py-3 sm:py-4 
          rounded-full text-sm sm:text-base font-medium 
          hover:opacity-90 transition 
          disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>

      </div>

    </div>
  </div>
);

}
