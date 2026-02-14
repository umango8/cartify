import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-32 bg-[#f5f5f7]">
      
      <div className="max-w-7xl mx-auto px-8 py-20">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-14">

          {/* Brand */}
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold tracking-tight text-black">
              Cartify
            </h2>

            <p className="text-gray-600 leading-relaxed text-sm max-w-xs">
              A refined ecommerce experience built with performance,
              simplicity and premium design principles.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold text-black mb-5 uppercase tracking-wide">
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
          <div>
            <h3 className="text-sm font-semibold text-black mb-5 uppercase tracking-wide">
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
          <div className="space-y-5">
            <h3 className="text-sm font-semibold text-black uppercase tracking-wide">
              Stay Updated
            </h3>

            <p className="text-gray-600 text-sm">
              Get notified about new launches and special offers.
            </p>

            <div className=" flex items-center border border-gray-300 rounded-full overflow-hidden bg-white">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-5 py-3 text-sm outline-none bg-transparent"
              />
              <button className="px-4.5 py-3 bg-black text-white text-sm font-medium hover:opacity-90 transition">
                Send
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-8 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Cartify. All rights reserved.
      </div>
    </footer>
  );
}
