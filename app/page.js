"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function Home() {
  const { addToCart } = useCart();

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
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7]">
        <p className="text-gray-500 text-lg">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#f5f5f7] overflow-hidden">

      {/* ================= HERO SLIDER ================= */}
      <section className="h-[80vh]">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 4000 }}
          loop
          className="h-full"
        >
          {products.slice(0, 3).map((product) => (
            <SwiperSlide key={product._id}>
              <div className="relative h-full flex items-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />

                <div className="relative z-10 max-w-7xl mx-auto px-8 text-white">
                  <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-6 max-w-2xl">
                    {product.name}
                  </h1>

                  <Link
                    href={`/products/${product._id}`}
                    className="bg-white text-black px-8 py-3 rounded-full font-medium hover:opacity-90 transition"
                  >
                    Discover
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-8">

          <h2 className="text-4xl font-semibold tracking-tight mb-14">
            Featured Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {products.slice(0, 4).map((product) => (
              <motion.div
                key={product._id}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl p-5 transition-all duration-500 hover:shadow-xl"
              >
                <Link href={`/products/${product._id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-60 object-cover rounded-2xl mb-5"
                  />
                </Link>

                <h3 className="font-medium text-lg mb-2">
                  {product.name}
                </h3>

                <p className="text-gray-500 text-sm mb-4">
                  ₹{product.price}
                </p>

           <div className="flex gap-3">
  <button
    onClick={() => addToCart(product)}
    className="flex-1 border border-black text-black py-2.5 rounded-full hover:bg-black hover:text-white transition"
  >
    Add
  </button>

  <button
    onClick={() => {
      addToCart(product);
      window.location.href = "/checkout";
    }}
    className="flex-1 bg-black text-white py-2.5 rounded-full hover:opacity-90 transition"
  >
    Buy Now
  </button>
</div>

              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TRENDING PRODUCTS ================= */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-8">

          <h2 className="text-4xl font-semibold tracking-tight mb-14">
            Trending Now
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {products.slice(4, 7).map((product) => (
              <motion.div
                key={product._id}
                whileHover={{ scale: 1.02 }}
                className="rounded-3xl overflow-hidden bg-[#f5f5f7]"
              >
                <Link href={`/products/${product._id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-72 object-cover"
                  />
                </Link>

                <div className="p-6">
                  <h3 className="text-xl font-medium mb-2">
                    {product.name}
                  </h3>

                  <p className="text-gray-600 mb-4">
                    ₹{product.price}
                  </p>

                  <button
                    onClick={() => addToCart(product)}
                    className="bg-black text-white px-6 py-2 rounded-full hover:opacity-90 transition"
                  >
                    Shop
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EXPLORE MORE ================= */}
      <section className="py-32 bg-[#f5f5f7] text-center">
        <div className="max-w-3xl mx-auto px-8">
          <h2 className="text-5xl font-semibold tracking-tight mb-6">
            Explore More Products
          </h2>

          <p className="text-gray-600 mb-10">
            Discover a curated collection designed for modern living.
          </p>

          <Link
            href="/products"
            className="bg-black text-white px-10 py-3 rounded-full font-medium hover:opacity-90 transition"
          >
            Browse Collection
          </Link>
        </div>
      </section>

    </div>
  );
}
