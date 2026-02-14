"use client";

import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-3xl p-4 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]">

      {/* Image */}
      <div className="relative overflow-hidden rounded-2xl bg-[#f5f5f7]">
        <Link href={`/products/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>

        {/* Quick Add */}
        <button
          onClick={() => addToCart(product)}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 
          bg-black text-white text-sm px-5 py-2 rounded-full
          opacity-0 group-hover:opacity-100 transition-all duration-300
          hover:opacity-90"
        >
          Add to Cart
        </button>
      </div>

      {/* Content */}
      <div className="mt-6 px-2">
        <h3 className="text-lg font-medium tracking-tight text-black">
          {product.name}
        </h3>

        <p className="mt-2 text-gray-600 text-sm">
          ₹{product.price}
        </p>
      </div>

    </div>
  );
}
