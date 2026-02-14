"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import AddToCartButton from "../../components/product/AddToCartButton";
import PageNavigation from "@/components/ui/Pagenation";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const router = useRouter();

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
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7]">
        <p className="text-gray-500 text-lg">Loading products...</p>
      </div>
    );
  }

  return (
    <div className=" bg-[#f5f5f7] py-1 px-6">
      <PageNavigation
  previous="/"
  next="/cart"
/>

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-semibold tracking-tight mb-14">
          All Products
        </h1>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-3xl p-4 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
            >
              {/* Image */}
              <Link href={`/products/${product._id}`}>
                <img
                  src={product.images?.[0] || product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-2xl"
                />
              </Link>

              {/* Content */}
              <div className="mt-6">

                <h2 className="text-lg font-medium tracking-tight">
                  {product.name}
                </h2>

                <p className="mt-2 text-gray-600 text-sm">
                  ₹{product.price}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {product.stock > 0
                    ? `In Stock (${product.stock})`
                    : "Out of Stock"}
                </p>

                {/* Buttons */}
                {product.stock > 0 ? (
                  <div className="mt-5 flex gap-3">

                    {/* Add */}
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 border border-black text-black py-2.5 rounded-full text-sm hover:bg-black hover:text-white transition"
                    >
                      Add
                    </button>

                    {/* Buy Now */}
                    <button
                      onClick={() => {
                        addToCart(product);
                        router.push("/checkout");
                      }}
                      className="flex-1 bg-black text-white py-2.5 rounded-full text-sm hover:opacity-90 transition"
                    >
                      Buy Now
                    </button>

                  </div>
                ) : (
                  <button
                    disabled
                    className="mt-5 w-full bg-gray-300 text-white py-2.5 rounded-full text-sm cursor-not-allowed"
                  >
                    Out of Stock
                  </button>
                )}

                {/* View Link */}
                <Link
                  href={`/products/${product._id}`}
                  className="block mt-4 text-sm text-gray-500 hover:opacity-60 transition"
                >
                  View Details →
                </Link>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
