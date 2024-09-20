import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer/Footer";
import { CartProvider } from "./context/cartContext";
import CartPopup from "./Components/cartPopUp";
import { OrderProvider } from "./context/orderContext";
import { AuthProvider } from "./context/authContext"; // Adjust the path as needed

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "STYLOCORE",
  description:
    "Welcome to Stylacor—your destination for timeless elegance and contemporary fashion. At Stylacor, we specialize in creating exceptional clothing that transcends trends, celebrating individuality and personal style. Discover our curated collection that merges classic sophistication with modern flair, designed to empower you to express your unique identity. Experience fashion that speaks to the essence of who you are.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  overflow-x-hidden`}
      >
        <AuthProvider>
          <CartProvider>
            <OrderProvider>
              <Navbar />
              {children}
              <Footer />
              <CartPopup />
            </OrderProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
