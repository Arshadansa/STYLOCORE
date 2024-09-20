"use client";

import React from "react";
import { useCart } from "../../context/cartContext";
import { FaIndianRupeeSign } from "react-icons/fa6";
import Image from "next/image";

export default function CartItem({ item, removeFromCart }) {
  const { addToCart } = useCart(); // Get addToCart from useCart hook

  const handleIncrease = () => {
    addToCart({ ...item, quantity: 1 }); // Increase quantity by 1
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      addToCart({ ...item, quantity: -1 }); // Decrease quantity by 1
    } else {
      removeFromCart(item.id); // Remove item if quantity is 1
    }
  };

  // Get the appropriate image based on the selected color
  const colorData = item.colors.find(
    (color) => color.color_name.toLowerCase() === item.color.toLowerCase()
  );
  const imageUrl = colorData ? colorData.images[0] : "";

  return (
    <div className="cart-item flex flex-col border md:flex-row gap-3 items-center justify-between md:p-4 border-b border-gray-200">
      <div className="flex items-center w-fit  md:w-auto">
        <Image
          src={imageUrl}
          alt={item.name}
          width={100}
          height={100}
          className="rounded-md"
        />
        <div className="ml-3">
          <p className="font-semibold text-lg leading-10 text-black">
            {item.name}
          </p>
          <p className="text-md flex space-x-1 text-gray-600">
            <span className="text-xl">{item.quantity}&nbsp;</span> x{" "}
            <span className="flex tracking-tighter text-lg items-center">
              <FaIndianRupeeSign className="text-lg" />
              {item.price} &nbsp;
            </span>
            =
            <span className="flex text-lg items-center">
              <FaIndianRupeeSign className="text-lg" />
              <span className="text-lg">
                {(item.quantity * item.price).toFixed(2)}
              </span>
            </span>
          </p>
        </div>
      </div>
      <div className="flex items-center w-fit gap-2 my-3 md:mt-0">
        <button
          onClick={handleDecrease}
          aria-label={`Decrease quantity of ${item.title}`}
          className="px-2 py-1 text-black rounded-md border transition"
        >
          -
        </button>
        <span className="text-sm text-black">{item.quantity}</span>
        <button
          onClick={handleIncrease}
          aria-label={`Increase quantity of ${item.name}`}
          className="px-2 py-1 text-black rounded-md border transition"
        >
          +
        </button>
        <button
         onClick={() => removeFromCart(item.id, item.price)}
          aria-label={`Remove ${item.name} from cart`}
          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
