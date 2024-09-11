'use client';

import React from 'react';
import { useCart } from '../../context/cartContext';

export default function CartItem({ item, removeFromCart }) {
  const { addToCart } = useCart(); // Get addToCart from useCart hook

  const handleIncrease = () => {
    console.log('Increasing quantity for:', item);
    addToCart({ ...item, quantity: 1 }); // Increase quantity by 1
  };

  const handleDecrease = () => {
    console.log('Decreasing quantity for:', item);
    if (item.quantity > 1) {
      addToCart({ ...item, quantity: -1 }); // Decrease quantity by 1
    } else {
      removeFromCart(item.id); // Remove item if quantity is 1
    }
  };

  return (
    <div className="cart-item flex items-center justify-between p-4 border-b border-gray-200">
      <div>
        <p className="font-semibold text-lg leading-10 text-black">
          {item.name}
        </p>
        <p className="text-md text-gray-600">
          {item?.quantity} x ${item?.price.toFixed(2)} = $
          {(item?.quantity * item?.price).toFixed(2)}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={handleDecrease}
          aria-label={`Decrease quantity of ${item.title}`}
          className="px-2 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
        >
          -
        </button>
        <span className="text-sm text-black">{item.quantity}</span>
        <button
          onClick={handleIncrease}
          aria-label={`Increase quantity of ${item.name}`}
          className="px-2 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
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
