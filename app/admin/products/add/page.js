"use client";

import { useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { useRouter } from "next/navigation";
import PageNavigation from "@/components/ui/Pagenation";

export default function AddProductPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    stock: "",
    category: "",
    images: ["", "", "", ""],
  });

  const [loading, setLoading] = useState(false);

  if (!user || user.role !== "admin") {
    return (
      <div className="text-center mt-20 text-red-500 font-semibold">
        Access Denied 🚫
      </div>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...form.images];
    updatedImages[index] = value;
    setForm({ ...form, images: updatedImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        setLoading(false);
        return;
      }

      alert("Product Added Successfully 🚀");
      router.push("/admin/products");

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <PageNavigation previous="/" next="/cart" />

    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center sm:text-left">
      Add New Product
    </h1>

    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 sm:p-8 rounded-2xl shadow-lg space-y-6"
    >
      
      {/* Basic Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          value={form.stock}
          onChange={handleChange}
          required
          className="w-full border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
          className="w-full border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        />
      </div>

      {/* Description */}
      <textarea
        name="description"
        placeholder="Product Description"
        value={form.description}
        onChange={handleChange}
        required
        rows="4"
        className="w-full border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
      />

      {/* Images Section */}
      <div className="space-y-4">
        <p className="font-semibold text-lg">
          Product Images (4 URLs)
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {form.images.map((img, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Image ${index + 1} URL`}
              value={img}
              onChange={(e) =>
                handleImageChange(index, e.target.value)
              }
              required
              className="w-full border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[var(--color-primary)] text-white py-3 sm:py-4 rounded-xl text-sm sm:text-base font-semibold hover:opacity-90 transition disabled:opacity-60"
      >
        {loading ? "Adding..." : "Add Product"}
      </button>

    </form>
  </div>
);

}
