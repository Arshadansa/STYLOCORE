"use client";
import { useMemo } from "react";
import { useCart } from "../context/cartContext";
import Link from "next/link";
import CartItem from "./cartitems/page";

export default function page() {
  const { cart, removeFromCart, clearCart } = useCart();

  const totalPrice = useMemo(() => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  }, [cart]);

  return (
    <div className="cart p-4 max-w-screen-xl mx-auto  shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <div className="w-full flex flex-col items-center justify-center ">
          <p className="text-red-400 text-2xl">Your cart is empty</p>
          <Link href="/collections-mens-product">
            <p className="text-blue-400">Continue Shopping</p>
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
          <h3 className="text-xl font-semibold mt-4">Total: ${totalPrice}</h3>
          <div className="w-full flex  justify-between">
            <button
              onClick={clearCart}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Clear Cart
            </button>
            <Link href="/cart">
              <button className="mt-4 ml-3 origin-right px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                CheckOut
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
