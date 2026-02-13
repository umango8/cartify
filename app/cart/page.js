"use client";

import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

if (cartItems.length === 0) {
  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold mb-4">
        Your Cart is Empty 🛒
      </h1>

      <p className="text-gray-500 mb-6">
        Looks like you haven’t added anything yet.
      </p>

      <Link
        href="/products"
        className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white px-6 py-3 rounded-lg transition"
      >
        Start Shopping
      </Link>
    </div>
  );
}


  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="space-y-6">
        {cartItems.map((item) => (
  <div
    key={item._id}
            className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm"
          >
            <div>
              <h2 className="font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-500">
                ₹{item.price} × {item.quantity}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) =>
                  updateQuantity(item._id, Number(e.target.value))
                }
                className="w-16 border rounded px-2 py-1"
              />

              <button
                onClick={() => removeFromCart(item._id)
}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-right">
        <h2 className="text-xl font-bold mb-4">
          Total: ₹{total}
        </h2>

        <Link
          href="/checkout"
          className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white px-6 py-2 rounded-lg transition"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
