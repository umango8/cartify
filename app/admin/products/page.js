"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import PageNavigation from "@/components/ui/Pagenation";

export default function AdminProductsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    if (user.role !== "admin") {
      router.push("/");
      return;
    }

    fetchProducts();
  }, [user]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products", { cache: "no-store" });
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm("Delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.message);
        return;
      }

      setProducts((prev) =>
        prev.filter((product) => product._id !== id)
      );

    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };

  if (!user) return null;

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

return (
  <div className="min-h-screen bg-[#f5f5f7]">

    <PageNavigation previous="/admin" next={null} />

    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-10">

        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Manage Products
          </h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Add, edit or remove products
          </p>
        </div>

        <button
          onClick={() => router.push("/admin/products/add")}
          className="bg-black text-white px-6 py-3 rounded-full text-sm hover:opacity-90 transition"
        >
          + Add Product
        </button>

      </div>

      {/* Products List */}
      <div className="space-y-6">

        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 
                       flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >

            {/* Product Info */}
            <div>
              <p className="font-semibold text-lg">
                {product.title}
              </p>
              <p className="text-gray-500 text-sm">
                ₹{product.price}
              </p>

              {product.stock <= 5 && (
                <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-red-100 text-red-600">
                  Low Stock ⚠
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">

              <button
                onClick={() =>
                  router.push(`/admin/products/edit/${product._id}`)
                }
                className="px-5 py-2 rounded-full border text-sm hover:bg-black hover:text-white transition"
              >
                Edit
              </button>

              <button
                onClick={() => deleteProduct(product._id)}
                className="px-5 py-2 rounded-full bg-red-500 text-white text-sm hover:opacity-90 transition"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  </div>
);

}
