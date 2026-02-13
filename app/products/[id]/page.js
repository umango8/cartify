"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ProductDetails() {
  const { id } = useParams();

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
        setSelectedImage(data.images?.[0] || "");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!product) {
    return <p className="text-center mt-10">Product not found</p>;
  }

  return (
    <div className="grid md:grid-cols-2 gap-10">

      {/* IMAGE SECTION */}
      <div>
        {selectedImage && (
          <img
            src={selectedImage}
            alt={product.title}
            className="w-full h-96 object-cover rounded-xl"
          />
        )}

        {/* Thumbnail Gallery */}
        <div className="flex gap-4 mt-4">
          {product.images?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="thumbnail"
              onClick={() => setSelectedImage(img)}
              className={`w-20 h-20 object-cover rounded-lg cursor-pointer border transition ${
                selectedImage === img
                  ? "border-[var(--color-primary)]"
                  : "border-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* PRODUCT INFO */}
      <div>
        <h1 className="text-3xl font-bold mb-4">
          {product.title}
        </h1>

        <p className="text-2xl font-semibold text-[var(--color-primary)] mb-6">
          ₹{product.price}
        </p>

        <p className="text-gray-600 mb-6">
          {product.description}
        </p>

        <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white px-8 py-3 rounded-lg transition">
          Add to Cart
        </button>
      </div>

    </div>
  );
}
