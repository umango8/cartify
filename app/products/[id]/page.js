"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "../../../context/CartContext";
import AddToCartButton from "../../../components/product/AddToCartButton";
import PageNavigation from "@/components/ui/Pagenation";

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();

        if (!res.ok) {
          setProduct(null);
          return;
        }

        setProduct(data);
        setSelectedImage(data.images?.[0] || data.image || "");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7]">
        <p className="text-gray-500 text-lg">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7]">
        <p className="text-gray-500 text-lg">Product not found.</p>
      </div>
    );
  }

  return (
    <div className=" bg-[#f5f5f7] py-3 px-6">
         <PageNavigation
        previous="/"
        next="/cart"
      />
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20">

        {/* IMAGE SECTION */}
        <div>
          {selectedImage && (
            <div className="bg-white rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-[500px] object-cover rounded-2xl"
              />
            </div>
          )}

          {/* Thumbnails */}
          <div className="flex gap-4 mt-6">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="thumbnail"
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-cover rounded-xl cursor-pointer border transition-all duration-300
                ${
                  selectedImage === img
                    ? "border-black scale-105"
                    : "border-gray-200 hover:border-black"
                }`}
              />
            ))}
          </div>
        </div>

        {/* PRODUCT INFO */}
        <div className="flex flex-col justify-center">

          <h1 className="text-4xl font-semibold tracking-tight mb-6">
            {product.name}
          </h1>

          <p className="text-3xl font-medium text-black mb-4">
            ₹{product.price}
          </p>

          <p className="text-sm text-gray-500 mb-8">
            {product.stock > 0
              ? `In Stock (${product.stock} available)`
              : "Currently Out of Stock"}
          </p>

          <p className="text-gray-700 leading-relaxed mb-10 max-w-lg">
            {product.description}
          </p>

          {/* ACTION BUTTONS */}
          <div className="space-y-4">

            {/* Add To Cart (with stock validation inside component) */}
            <AddToCartButton product={product} />

            {/* Buy Now */}
            {/* {product.stock > 0 && (
              <button
                onClick={() => {
                  addToCart(product);
                  router.push("/checkout");
                }}
                className="w-full bg-black text-white py-3 rounded-full text-sm font-medium hover:opacity-90 transition"
              >
                Buy Now
              </button>
            )} */}

          </div>

        </div>

      </div>
    </div>
  );
}
