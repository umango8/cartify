"use client";

import { useCart } from "../../context/CartContext";

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();

  const handleClick = () => {
    addToCart(product);
  };

  return (
    <button
      onClick={handleClick}
      className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white px-4 py-2 rounded-lg text-sm transition"
    >
      Add to Cart
    </button>
  );
}
