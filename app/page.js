"use client";

import Link from "next/link";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function Home() {
  const { addToCart } = useCart();

  return (
    <div className="bg-gray-50 overflow-hidden">

      {/* ================= HERO SLIDER ================= */}
      <section className="h-[75vh]">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3500 }}
          loop
          className="h-full"
        >
          {products.slice(0, 3).map((product) => (
            <SwiperSlide key={product.id}>
              <div className="relative h-full flex items-center text-white">
                <img
                  src={product.image}
                  alt={product.title}
                  className="absolute inset-0 w-full h-full object-cover brightness-50"
                />
                <div className="relative z-10 max-w-7xl mx-auto px-6">
                  <h1 className="text-5xl font-bold mb-6">
                    {product.title}
                  </h1>
                  <Link
                    href={`/products/${product.id}`}
                    className="bg-[var(--color-primary)] px-8 py-3 rounded-lg"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ================= FEATURED SLIDER ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl font-bold mb-8">
            Featured Products
          </h2>

          <Swiper
            slidesPerView={2}
            spaceBetween={20}
            breakpoints={{
              768: { slidesPerView: 4 },
            }}
          >
            {products.slice(0, 6).map((product) => (
              <SwiperSlide key={product.id}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition p-4 relative"
                >
                  {/* SALE BADGE */}
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    SALE
                  </span>

                  <Link href={`/products/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                  </Link>

                  <h3 className="font-semibold mb-2">
                    {product.title}
                  </h3>

                  <p className="text-[var(--color-primary)] font-bold mb-3">
                    ₹{product.price}
                  </p>

                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white py-2 rounded-lg transition"
                  >
                    Add to Cart
                  </button>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </section>

      {/* ================= CATEGORY BANNERS ================= */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6">

          <motion.div whileHover={{ scale: 1.02 }} className="relative h-60 rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1518444028797-43d0f2f3e5b1"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-2xl font-bold">
              Electronics
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="relative h-60 rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-2xl font-bold">
              Fashion
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="relative h-60 rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-2xl font-bold">
              Accessories
            </div>
          </motion.div>

        </div>
      </section>

      {/* ================= EXPLORE ALL ================= */}
      <section className="py-24 bg-[var(--color-primary)] text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto px-6"
        >
          <h2 className="text-4xl font-bold mb-6">
            Explore the Full Collection
          </h2>

          <p className="mb-8 opacity-90">
            Find products that match your style and elevate your lifestyle.
          </p>

          <Link
            href="/products"
            className="bg-white text-[var(--color-primary)] px-8 py-3 rounded-lg font-semibold"
          >
            Browse All Products
          </Link>
        </motion.div>
      </section>

    </div>
  );
}
