"use client";

import React from "react";
import { useCart } from "../../context/cartContext";
import { FaIndianRupeeSign } from "react-icons/fa6";

export default function CartItem({ item, removeFromCart }) {
  const { addToCart } = useCart(); // Get addToCart from useCart hook

  const handleIncrease = () => {
    console.log("Increasing quantity for:", item);
    addToCart({ ...item, quantity: 1 }); // Increase quantity by 1
  };

  const handleDecrease = () => {
    console.log("Decreasing quantity for:", item);
    if (item.quantity > 1) {
      addToCart({ ...item, quantity: -1 }); // Decrease quantity by 1
    } else {
      removeFromCart(item.id); // Remove item if quantity is 1
    }
  };

  return (
    <div className="cart-item flex flex-wrap gap-3 items-center justify-between p-4 border-b border-gray-200">
      <div className="">
        <p className="font-semibold text-lg leading-10 text-black">
          {item.name}
        </p>
        <p className="text-md flex text-md space-x-1 text-gray-600">
          <span className="  text-xl"> {item?.quantity}&nbsp; </span> x{" "}
          <span className="flex  tracking-tighter text-lg items-center">
            <FaIndianRupeeSign className="text-lg" />
            {item?.price} &nbsp;
          </span>
          =
          <span className="flex text-lg items-center">
            <FaIndianRupeeSign className="text-lg" />
          </span>
         <span className="text-lg">{item?.quantity * item?.price}</span> 
        </p>
      </div>
      <div className="flex  items-center gap-2">
        <button
          onClick={handleDecrease}
          aria-label={`Decrease quantity of ${item.title}`}
          className="px-2 py-1  text-black rounded-md border transition"
        >
          -
        </button>
        <span className="text-sm text-black">{item.quantity}</span>
        <button
          onClick={handleIncrease}
          aria-label={`Increase quantity of ${item.name}`}
          className="px-2 py-1  text-black rounded-md border transition"
        >
          +
        </button>
        <button
          onClick={() => removeFromCart(item.id)}
          aria-label={`Remove ${item.name} from cart`}
          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
