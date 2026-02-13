"use client";

import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
      
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <Link href={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Overlay Quick Add Button */}
        <button
          onClick={() => addToCart(product)}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition duration-300"
        >
          Add to cart
        </button>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2">
          {product.title}
        </h3>

        <p className="text-[var(--color-primary)] font-bold text-lg">
          ₹{product.price}
        </p>
      </div>
    </div>
  );
}
