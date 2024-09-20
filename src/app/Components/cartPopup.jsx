"use client";

import { useEffect, useState } from "react";
import { useCart } from "../context/cartContext";

const CartPopup = () => {
  const { notification } = useCart();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (notification?.type) {
      setMessage(notification.message);
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000); // Popup will disappear after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Define popupStyle with a default value
  const popupStyle = (() => {
    switch (notification?.type) {
      case "add":
        return "bg-green-500"; // Success
      case "remove":
        return "bg-red-500"; // Error
      case "update":
        return "bg-yellow-500"; // Warning
      case "clear":
        return "bg-blue-500"; // Info
      default:
        return "bg-gray-500"; // Default
    }
  })();

  return (
    visible && (
      <div
        className={`fixed z-50 top-4 right-4 text-white p-4 rounded shadow-lg ${popupStyle}`}
      >
        {message}
      </div>
    )
  );
};

export default CartPopup;
