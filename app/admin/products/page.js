"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

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
    <div className="max-w-6xl mx-auto mt-12 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          Manage Products
        </h1>

        <button
          onClick={() => router.push("/admin/products/add")}
          className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg"
        >
          Add Product
        </button>
      </div>

      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white p-6 rounded-xl shadow-md flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">
              {product.title}
            </p>
            <p className="text-gray-500">
              ₹{product.price}
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() =>
                router.push(`/admin/products/edit/${product._id}`)
              }
              className="px-4 py-1 border rounded-lg"
            >
              Edit
            </button>

            <button
              onClick={() => deleteProduct(product._id)}
              className="px-4 py-1 bg-red-500 text-white rounded-lg"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
