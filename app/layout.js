import { Sora, Inter } from "next/font/google";
import "./globals.css";
import Header from "./_components/ui/Header";
import Footer from "./_components/ui/Footer";
import { Toaster } from "sonner";
import ScrollToTop from "./_components/ui/ScrollToUp";

export const metadata = {
  title: "VibeCheck",
  description:
    "Vibecheck is a polished fashion e-commerce app. It provides a modern user experience, product discovery, cart management, checkout, and profile-based account features.",
  icons: {
    icon: "./favicon.svg",
    shortcut: "./favicon.svg",
    apple: "./favicon.svg",
  },
};

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html className={`${sora.variable} ${inter.variable}`}>
      <body>
        <ScrollToTop />
        <Toaster position="top-right" richColors />
        <Header />
        <main className="min-h-[85vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
