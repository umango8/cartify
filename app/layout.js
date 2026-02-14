"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import { CartProvider } from "../context/CartContext";
import { OrderProvider } from "../context/OrderContext";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const isAuthPage =
    pathname === "/login" || pathname === "/register";

  return (
    <html lang="en">
      <body className="bg-[var(--color-background)] text-[var(--color-dark)]">
        <CartProvider>
          <OrderProvider>
            <AuthProvider>

              {!isAuthPage && <Navbar />}

              <main className={!isAuthPage ? "max-w-7xl mx-auto px-6 " : ""}>
                {children}
              </main>

              {!isAuthPage && <Footer />}

            </AuthProvider>
          </OrderProvider>
        </CartProvider>
      </body>
    </html>
  );
}
