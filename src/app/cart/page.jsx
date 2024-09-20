"use client";

import { useMemo, useState } from "react";
import { useCart } from "../context/cartContext";
import Link from "next/link";
import CartItem from "./cartitems/page";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useAuth } from "../context/authContext"; // Use the correct hook from Auth context
import NoProduct from "../Components/loader/NoProduct";
import Login from "../Components/Login";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const { user } = useAuth(); // Use auth context to check if the user is logged in
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const totalPrice = useMemo(() => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  }, [cart]);

  const handleCheckout = () => {
    if (!user) {
      // If the user is not logged in, show the login modal
      setShowLoginPopup(true);
    } else {
      // Proceed to checkout if the user is logged in
      window.location.href = "/checkout";
    }
  };

  return (
    <section className="border-t border-b border-primary flex items-center justify-center flex-col p-3">
      <h2 className="text-2xl text-center font-bold mt-4">Shopping Cart</h2>
      <div className="my-24 w-[80%] border p-4 bg-white shadow-md rounded-md">
        {cart.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center">
            <p className="text-primary my-3 text-3xl md:text-5xl">
              Your cart is empty
            </p>
            <Link href="/allproducts">
              <button className="bg-[#5b5c70] font-bold hover:underline hover:bg-primary text-white p-3 px-7 hover:scale-95 transition-all duration-700 ease-in-out rounded-md">
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div>
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                removeFromCart={removeFromCart}
              />
            ))}
            <div className="flex mt-4 items-center">
              <span>
                <FaIndianRupeeSign size={20} className="text-xl" />
              </span>
              <span className="text-xl font-semibold">Total: {totalPrice}</span>
            </div>
            <div className="flex flex-col md:flex-row justify-between">
              <button
                onClick={clearCart}
                className="bg-[#5b5c70] w-fit font-bold hover:bg-primary mt-4 text-white p-3 px-7 hover:scale-95 transition-all duration-700 ease-in-out rounded-md"
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckout} // Handle checkout click
                className="bg-[#5b5c70] w-fit font-bold hover:bg-primary mt-4 text-white p-3 px-7 hover:scale-95 transition-all duration-700 ease-in-out rounded-md"
              >
                CheckOut
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Show login modal if the user is not logged in */}
      {showLoginPopup && (
        <div className="fixed inset-0  flex flex-col text-3xl text-white items-center justify-center bg-black bg-opacity-50 z-50">
          <Login />
        </div>
      )}
    </section>
  );
}
