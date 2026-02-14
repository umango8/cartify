import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 bg-[#f5f5f7]">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">

          {/* Brand */}
          <div className="space-y-5 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-black">
              Cartify
            </h2>

            <p className="text-gray-600 leading-relaxed text-sm max-w-xs mx-auto sm:mx-0">
              A refined ecommerce experience built with performance,
              simplicity and premium design principles.
            </p>
          </div>

          {/* Explore */}
          <div className="text-center sm:text-left">
            <h3 className="text-xs sm:text-sm font-semibold text-black mb-4 uppercase tracking-wide">
              Explore
            </h3>

            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link href="/products" className="hover:opacity-60 transition">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:opacity-60 transition">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:opacity-60 transition">
                  My Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div className="text-center sm:text-left">
            <h3 className="text-xs sm:text-sm font-semibold text-black mb-4 uppercase tracking-wide">
              Account
            </h3>

            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link href="/login" className="hover:opacity-60 transition">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:opacity-60 transition">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:opacity-60 transition">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-5 text-center sm:text-left">
            <h3 className="text-xs sm:text-sm font-semibold text-black uppercase tracking-wide">
              Stay Updated
            </h3>

            <p className="text-gray-600 text-sm">
              Get notified about new launches and special offers.
            </p>

            {/* Responsive Newsletter */}
            <div className="flex flex-col sm:flex-row items-stretch border border-gray-300 rounded-2xl overflow-hidden bg-white">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-5 py-3 text-sm outline-none bg-transparent"
              />
              <button className="px-6 py-3 bg-black text-white text-sm font-medium hover:opacity-90 transition">
                Send
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-6 text-center text-xs text-gray-500 px-4">
        © {new Date().getFullYear()} Cartify. All rights reserved.
      </div>

    </footer>
  );
}
