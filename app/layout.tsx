import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";
import BulkOrderPopup from "@/components/BulkOrderPopup";
import MobileRestriction from "@/components/MobileRestriction";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HSGA SHOP | Premium Student Forge Merch",
  description: "Official store for HSGA - Forged by Student Forge. Premium athletic wear and exclusive collections.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-white text-zinc-900 selection:bg-[#ff5e00] selection:text-white`}
      >
        <CartProvider>
          <MobileRestriction />
          <BulkOrderPopup />
          {children}
        </CartProvider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
