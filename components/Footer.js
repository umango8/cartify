import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10 text-sm text-gray-600">

        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-4">
            Cartify
          </h2>
          <p className="leading-relaxed">
            Modern ecommerce platform built with Next.js.
            Clean UI. Smooth UX. Built for frontend excellence.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link href="/products" className="hover:text-[var(--color-primary)] transition">
                Products
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-[var(--color-primary)] transition">
                Cart
              </Link>
            </li>
            <li>
              <Link href="/orders" className="hover:text-[var(--color-primary)] transition">
                Orders
              </Link>
            </li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">
            Account
          </h3>
          <ul className="space-y-2">
            <li>
              <Link href="/login" className="hover:text-[var(--color-primary)] transition">
                Login
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:text-[var(--color-primary)] transition">
                Register
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">
            Subscribe
          </h3>
          <p className="mb-4">
            Get updates about new products and offers.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter email"
              className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none"
            />
            <button className="bg-[var(--color-primary)] text-white px-4 rounded-r-lg hover:bg-[var(--color-primary-dark)] transition">
              Join
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t py-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Cartify. All rights reserved.
      </div>
    </footer>
  );
}
