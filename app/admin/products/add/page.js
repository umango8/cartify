"use client";

import { useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { useRouter } from "next/navigation";

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
    <div className="max-w-4xl mx-auto mt-12">
      <h1 className="text-3xl font-bold mb-8">
        Add New Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md space-y-6"
      >
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded-lg"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded-lg"
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          value={form.stock}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded-lg"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded-lg"
        />

        <textarea
          name="description"
          placeholder="Product Description"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded-lg"
        />

        <div className="space-y-3">
          <p className="font-semibold">Product Images (4 URLs)</p>

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
              className="w-full border px-4 py-2 rounded-lg"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[var(--color-primary)] text-white py-3 rounded-lg"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
