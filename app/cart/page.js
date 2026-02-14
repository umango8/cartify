"use client";

import Link from "next/link";
import { useCart } from "../../context/CartContext";
import PageNavigation from "@/components/ui/Pagenation";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className=" min-h-screen  flex   items-center justify-center bg-[#f5f5f7] px-6">
       
        <div className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight mb-6">
            Your Cart is Empty
          </h1>

          <p className="text-gray-600 mb-8">
            Looks like you haven’t added anything yet.
          </p>

          <Link
            href="/products"
            className="bg-black text-white px-8 py-3 rounded-full hover:opacity-90 transition"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

return (
  <div className="bg-[#f5f5f7] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
    
    <PageNavigation previous="/" next="/cart" />

    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">

      {/* LEFT: CART ITEMS */}
      <div className="lg:col-span-2 space-y-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
          Your Cart
        </h1>

        {cartItems.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 
            shadow-[0_15px_50px_rgba(0,0,0,0.05)] 
            flex flex-col sm:flex-row sm:justify-between 
            sm:items-center gap-6"
          >
            {/* Product Info */}
            <div>
              <h2 className="text-base sm:text-lg font-medium text-black">
                {item.name}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                ₹{item.price} × {item.quantity}
              </p>

              <p className="text-sm font-medium mt-2">
                ₹{item.price * item.quantity}
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">

              {/* Quantity */}
              <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                <button
                  onClick={() =>
                    updateQuantity(item._id, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                  className="px-4 py-2 text-sm hover:bg-gray-100 transition disabled:opacity-40"
                >
                  −
                </button>

                <span className="px-4 text-sm">
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    updateQuantity(item._id, item.quantity + 1)
                  }
                  disabled={item.quantity >= item.stock}
                  className="px-4 py-2 text-sm hover:bg-gray-100 transition disabled:opacity-40"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item._id)}
                className="text-sm text-gray-500 hover:text-black transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT: ORDER SUMMARY */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 
      shadow-[0_15px_50px_rgba(0,0,0,0.05)] 
      h-fit lg:sticky lg:top-24">

        <h2 className="text-xl sm:text-2xl font-medium mb-6 sm:mb-8">
          Order Summary
        </h2>

        <div className="flex justify-between mb-4 text-gray-600 text-sm sm:text-base">
          <span>Subtotal</span>
          <span>₹{total}</span>
        </div>

        <div className="flex justify-between text-base sm:text-lg font-medium mb-8 sm:mb-10">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <Link
          href="/checkout"
          className="block text-center bg-black text-white py-3 rounded-full 
          font-medium hover:opacity-90 transition"
        >
          Proceed to Checkout
        </Link>
      </div>

    </div>
  </div>
);

}
