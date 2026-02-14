"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../../../context/AuthContext";
import { useRouter } from "next/navigation";
import PageNavigation from "@/components/ui/Pagenation";


export default function EditProductPage({ params }) {
  const { user } = useAuth();
  const router = useRouter();

  const [id, setId] = useState(null);
  useEffect(() => {
  const init = async () => {
    const resolvedParams = await params;
    setId(resolvedParams.id);
  };

  init();
}, []);


  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  if (!user || user.role !== "admin") {
    router.push("/");
    return;
  }

  if (!id) return;

  fetchProduct();
}, [user, id]);


  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      setForm(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Product Updated Successfully ✅");
      router.push("/admin/products");

    } catch (error) {
      console.log(error);
      alert("Update failed");
    }
  };

  if (!form || loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

 return (
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <PageNavigation previous="/" next="/cart" />

    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center sm:text-left">
      Edit Product
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
          value={form.title}
          onChange={handleChange}
          placeholder="Product Title"
          className="w-full border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        />

        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        />

        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="w-full border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        />

        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        />
      </div>

      {/* Description */}
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Product Description"
        rows="4"
        className="w-full border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
      />

      {/* Images Section */}
      <div className="space-y-4">
        <p className="font-semibold text-lg">Product Images</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {form.images.map((img, index) => (
            <input
              key={index}
              type="text"
              value={img}
              onChange={(e) =>
                handleImageChange(index, e.target.value)
              }
              placeholder={`Image URL ${index + 1}`}
              className="w-full border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          ))}
        </div>
      </div>

      {/* Checkboxes */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.isFeatured}
            onChange={(e) =>
              setForm({
                ...form,
                isFeatured: e.target.checked,
              })
            }
            className="w-5 h-5"
          />
          <span>Featured Product</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.isTrending}
            onChange={(e) =>
              setForm({
                ...form,
                isTrending: e.target.checked,
              })
            }
            className="w-5 h-5"
          />
          <span>Trending Product</span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-[var(--color-primary)] text-white py-3 sm:py-4 rounded-xl text-sm sm:text-base font-semibold hover:opacity-90 transition"
      >
        Update Product
      </button>

    </form>
  </div>
);

}
