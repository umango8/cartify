"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../../../context/AuthContext";
import { useRouter } from "next/navigation";


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
    <div className="max-w-4xl mx-auto mt-12">
      <h1 className="text-3xl font-bold mb-8">
        Edit Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md space-y-6"
      >
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <div className="space-y-3">
          <p className="font-semibold">Product Images</p>

          {form.images.map((img, index) => (
            <input
              key={index}
              type="text"
              value={img}
              onChange={(e) =>
                handleImageChange(index, e.target.value)
              }
              className="w-full border px-4 py-2 rounded-lg"
            />
          ))}
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(e) =>
                setForm({
                  ...form,
                  isFeatured: e.target.checked,
                })
              }
            />
            Featured
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isTrending}
              onChange={(e) =>
                setForm({
                  ...form,
                  isTrending: e.target.checked,
                })
              }
            />
            Trending
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-[var(--color-primary)] text-white py-3 rounded-lg"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
