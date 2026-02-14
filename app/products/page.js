// "use client";
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import PageNavigation from "@/components/ui/Pagenation";

const LIMIT = 12;

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `/api/products?page=${page}&limit=${LIMIT}`
        );

        const data = await res.json();

        setProducts((prev) => [...prev, ...data.products]);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

    fetchProducts();
  }, [page]);

  // First load screen
  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7]">
        <p className="text-gray-500 text-lg">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#f5f5f7] py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      
      <PageNavigation previous="/" next="/cart" />

      <div className="max-w-7xl mx-auto">

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight mb-8 sm:mb-12 lg:mb-14">
          All Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-10">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 
              transition-all duration-500 
              hover:-translate-y-1 sm:hover:-translate-y-2 
              hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
            >
              <Link href={`/products/${product._id}`}>
                <img
                  src={product.images?.[0]}
                  alt={product.title}
                  className="w-full h-40 sm:h-52 md:h-56 lg:h-64 
                  object-cover rounded-xl sm:rounded-2xl"
                />
              </Link>

              <div className="mt-4 sm:mt-6">

                <h2 className="text-sm sm:text-base lg:text-lg font-medium tracking-tight">
                  {product.title}
                </h2>

                <p className="mt-1 sm:mt-2 text-gray-600 text-sm">
                  ₹{product.price}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {product.stock > 0
                    ? `In Stock (${product.stock})`
                    : "Out of Stock"}
                </p>

                {product.stock > 0 ? (
                  <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full border border-black text-black 
                      py-2 rounded-full text-xs sm:text-sm 
                      hover:bg-black hover:text-white transition"
                    >
                      Add
                    </button>

                    <button
                      onClick={() => {
                        addToCart(product);
                        router.push("/checkout");
                      }}
                      className="w-full bg-black text-white 
                      py-2 rounded-full text-xs sm:text-sm 
                      hover:opacity-90 transition"
                    >
                      Buy Now
                    </button>
                  </div>
                ) : (
                  <button
                    disabled
                    className="mt-4 w-full bg-gray-300 text-white 
                    py-2 rounded-full text-xs sm:text-sm cursor-not-allowed"
                  >
                    Out of Stock
                  </button>
                )}

                <Link
                  href={`/products/${product._id}`}
                  className="block mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 hover:opacity-60 transition"
                >
                  View Details →
                </Link>

              </div>
            </div>
          ))}
        </div>

        {/* LOAD MORE BUTTON */}
        {page < totalPages && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-8 py-3 bg-black text-white rounded-full 
                         hover:bg-gray-800 hover:scale-105 
                         transition duration-300 shadow-md"
            >
              {loading ? "Loading..." : "Load More Products"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
