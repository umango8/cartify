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
  const [featuredProducts, setFeaturedProducts] = useState([]);
const [trendingProducts, setTrendingProducts] = useState([]);


  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const res = await fetch("/api/products");
  //       const data = await res.json();
  //       setProducts(data.products);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, []);
  useEffect(() => {
  const fetchData = async () => {
    try {
      const featuredRes = await fetch("/api/products?featured=true&limit=4");
      const featuredData = await featuredRes.json();

      const trendingRes = await fetch("/api/products?trending=true&limit=6");
      const trendingData = await trendingRes.json();

      const heroRes = await fetch("/api/products?limit=3");
      const heroData = await heroRes.json();

      setProducts(heroData.products);
      setFeaturedProducts(featuredData.products);
      setTrendingProducts(trendingData.products);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
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
    <section className="relative h-[55vh] sm:h-[65vh] md:h-[75vh] lg:h-[85vh]">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 4000 }}
        loop
        className="h-full"
      >
       {Array.isArray(products) &&
  products.slice(0, 3).map((product) => (
          <SwiperSlide key={product._id}>
            <div className="relative h-full flex items-center">
              <img
                src={product.images}
                alt={product.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/40" />

              <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
                <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-6xl font-semibold tracking-tight mb-6 max-w-lg sm:max-w-2xl leading-tight">
                  {product.title}
                </h1>

                <Link
                  href={`/products/${product._id}`}
                  className="inline-block bg-white text-black px-5 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium hover:opacity-90 transition"
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
    <section className="py-12 sm:py-16 md:py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight mb-8 sm:mb-12 lg:mb-14">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
       {featuredProducts.map((product)  => (
            <motion.div
              key={product._id}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 transition-all duration-500 hover:shadow-xl"
            >
              <Link href={`/products/${product._id}`}>
                <img
                  src={product.images}
                  alt={product.title}
                  className="w-full h-36 sm:h-48 md:h-52 lg:h-60 object-cover rounded-xl sm:rounded-2xl mb-4"
                />
              </Link>

              <h3 className="text-sm sm:text-base lg:text-lg font-medium mb-1">
                {product.title}
              </h3>

              <p className="text-gray-500 text-sm mb-3">
                ₹{product.price}
              </p>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => addToCart(product)}
                  className="w-full border border-black text-black py-2 rounded-full text-xs sm:text-sm hover:bg-black hover:text-white transition"
                >
                  Add
                </button>

                <button
                  onClick={() => {
                    addToCart(product);
                    window.location.href = "/checkout";
                  }}
                  className="w-full bg-black text-white py-2 rounded-full text-xs sm:text-sm hover:opacity-90 transition"
                >
                  Buy Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        <Link
          href="/products"
         
          className="flex justify-center mt-4  bg-black text-white px-7 sm:px-10 py-3 rounded-full text-sm sm:text-base font-medium hover:opacity-90 transition"
          
        >
          explore more 
        </Link>
      </div>
        
    </section>


    {/* ================= TRENDING PRODUCTS ================= */}
    <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight mb-8 sm:mb-12 lg:mb-14">
          Trending Now
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
         {trendingProducts.map((product) => (
            <motion.div
              key={product._id}
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl sm:rounded-3xl overflow-hidden bg-[#f5f5f7]"
            >
              <Link href={`/products/${product._id}`}>
                <img
                  src={product.images}
                  alt={product.title}
                  className="w-full h-44 sm:h-56 md:h-64 lg:h-72 object-cover"
                />
              </Link>

              <div className="p-4 sm:p-6">
                <h3 className="text-sm sm:text-base lg:text-xl font-medium mb-2">
                  {product.title}
                </h3>

                <p className="text-gray-600 text-sm sm:text-base mb-4">
                  ₹{product.price}
                </p>

                <button
                  onClick={() => addToCart(product)}
                  className="bg-black text-white px-5 py-2 rounded-full text-xs sm:text-sm hover:opacity-90 transition"
                >
                  Shop
                </button>
              </div>
            </motion.div>
          ))}
        </div>
         <Link
          href="/products"
          className="flex justify-center mt-4  bg-black text-white px-7 sm:px-10 py-3 rounded-full text-sm sm:text-base font-medium hover:opacity-90 transition"
        >
          explore more
        </Link>
      </div>
    </section>


    {/* ================= EXPLORE MORE ================= */}
    <section className="py-14 sm:py-20 md:py-24 lg:py-32 bg-[#f5f5f7] text-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-5 sm:mb-6">
          Explore More Products
        </h2>

        <p className="text-gray-600 text-sm sm:text-base mb-8 sm:mb-10">
          Discover a curated collection designed for modern living.
        </p>

        <Link
          href="/products"
          className="inline-block bg-black text-white px-7 sm:px-10 py-3 rounded-full text-sm sm:text-base font-medium hover:opacity-90 transition"
        >
          Browse Collection
        </Link>

      </div>
    </section>

  </div>
);


}
