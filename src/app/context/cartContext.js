'use client'

import  { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';

// Create the context
const CartContext = createContext();

// Helper function to calculate the total price
const calculateTotalPrice = (cart) => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
};

// Helper function to calculate the total item count
const calculateItemCount = (cart) => {
  return cart.reduce((total, item) => total + item.quantity, 0);
};

// Load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error("Failed to load cart from localStorage", error);
    return [];
  }
};

// Save cart to localStorage (debounced)
const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to save cart to localStorage", error);
  }
};

// Create a provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState({ type: '', message: '' });

  // Load cart from localStorage on first render
  useEffect(() => {
    const storedCart = loadCartFromStorage();
    setCart(storedCart);
  }, []);

  // Save cart to localStorage with debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      saveCartToStorage(cart);
    }, 300); // Debounced save

    return () => clearTimeout(handler);
  }, [cart]);

  // Add to cart
  const addToCart = useCallback((product) => {
    setCart((prevCart) => {
      // Check for existing products with the same ID, color, size, and price
      const existingProductIndex = prevCart.findIndex(item =>
        item.id === product.id &&
        item.color === product.color && // Ensure color matches
        item.size === product.size && // Ensure size matches
        item.price === product.price // Ensure price matches
      );
  
      const updatedCart = [...prevCart];
  
      if (existingProductIndex > -1) {
        // If it exists, update the quantity
        updatedCart[existingProductIndex].quantity += product.quantity;
        setNotification({ type: 'update', message: `${product.name} quantity updated` });
      } else {
        // If it doesn't exist, add it as a new product
        updatedCart.push(product);
        setNotification({ type: 'add', message: `${product.name} added to cart` });
      }
  
      return updatedCart;
    });
  }, []);
  

  // Remove from cart
  const removeFromCart = useCallback((productId, productPrice) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => {
        // Remove the item only if both ID and price match
        return !(item.id === productId && item.price === productPrice);
      });
      
      const itemToRemove = prevCart.find(item => item.id === productId && item.price === productPrice);
      
      if (itemToRemove) {
        setNotification({ type: 'remove', message: `${itemToRemove.name} removed from cart` });
      }
  
      return updatedCart;
    });
  }, []);
  

  // Clear cart
  const clearCart = useCallback(() => {
    setCart([]);
    setNotification({ type: 'clear', message: 'Cart cleared' });
  }, []);


  const value = useMemo(() => ({
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    totalPrice: calculateTotalPrice(cart),
    itemCount: calculateItemCount(cart),
    notification,

  }), [cart, addToCart, removeFromCart, clearCart, notification, ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);
