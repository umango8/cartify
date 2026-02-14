"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";

export default function AddToCartButton({ product }) {
  const { cartItems, addToCart } = useCart();
  const router = useRouter();

  const [error, setError] = useState("");

  const existingItem = cartItems.find(
    (item) => item._id === product._id
  );

  const currentQuantity = existingItem
    ? existingItem.quantity
    : 0;

  const handleAdd = () => {
    setError("");

    if (product.stock <= 0) {
      setError("This product is currently out of stock.");
      return;
    }

    if (currentQuantity >= product.stock) {
      setError("No more stock available.");
      return;
    }

    addToCart(product);
  };

  const handleBuyNow = () => {
    setError("");

    if (product.stock <= 0) {
      setError("This product is currently out of stock.");
      return;
    }

    if (currentQuantity >= product.stock) {
      setError("No more stock available.");
      return;
    }

    addToCart(product);
    router.push("/checkout");
  };

  return (
    <div className="mt-6 space-y-3">

      <div className="flex gap-4">
        {/* Add to Cart */}
        <button
          onClick={handleAdd}
          disabled={product.stock <= 0}
          className={`flex-1 py-3 rounded-full text-sm font-medium transition-all duration-300
            ${
              product.stock <= 0
                ? "bg-gray-300 text-white cursor-not-allowed"
                : "border border-black text-black hover:bg-black hover:text-white"
            }`}
        >
          Add to Cart
        </button>

        {/* Buy Now */}
        <button
          onClick={handleBuyNow}
          disabled={product.stock <= 0}
          className={`flex-1 py-3 rounded-full text-sm font-medium transition-all duration-300
            ${
              product.stock <= 0
                ? "bg-gray-300 text-white cursor-not-allowed"
                : "bg-black text-white hover:opacity-90"
            }`}
        >
          Buy Now
        </button>
      </div>

      {/* Inline Error */}
      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
