"use client";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

const handlePlaceOrder = async () => {
  console.log("User:", user);
  console.log("Cart Items:", cartItems);

  if (!user) {
    alert("Please login first");
    return;
  }

  if (cartItems.length === 0) {
    alert("Cart is empty");
    return;
  }

  try {
    const orderItems = cartItems.map((item) => ({
      product: item._id,
      quantity: item.quantity,
    }));

    console.log("Sending Order:", orderItems);

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
        items: orderItems,
        totalAmount: total,
      }),
    });

    const data = await res.json();

    console.log("Response:", data);

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Order placed successfully!");
    clearCart();
    router.push("/orders");

  } catch (error) {
    console.log("Error:", error);
    alert("Something went wrong");
  }
};


  if (cartItems.length === 0) {
    return (
      <h1 className="text-center mt-10">
        Your cart is empty
      </h1>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">
        Checkout
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex justify-between mb-4"
          >
            <span>
              {item.title} × {item.quantity}
            </span>
            <span>
              ₹{item.price * item.quantity}
            </span>
          </div>
        ))}

        <hr className="my-4" />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white py-3 rounded-lg transition"
      >
        Place Order
      </button>
    </div>
  );
}
