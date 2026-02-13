"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AddToCartButton from "../../components/product/AddToCartButton";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10">
        Loading products...
      </p>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition"
        >
          <img
            src={product.images?.[0]}
            alt={product.title}
            className="w-full h-64 object-cover"
          />

          <div className="p-5">
            <h2 className="text-lg font-semibold mb-2">
              {product.title}
            </h2>

            <p className="text-[var(--color-primary)] font-bold mb-4">
              ₹{product.price}
            </p>

            <div className="flex justify-between items-center">
              <AddToCartButton product={product} />

              <Link
                href={`/products/${product._id}`}
                className="text-sm text-[var(--color-primary)] font-medium"
              >
                View →
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
