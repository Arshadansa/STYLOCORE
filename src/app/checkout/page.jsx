'use client';

import { useState, useMemo, useEffect } from "react";
import { useCart } from "../context/cartContext";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { firestore } from "../lib/firebase";
import { collection, addDoc, doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useOrder } from '../context/orderContext'; // Adjust path
import { useAuth } from '../context/authContext'; // Adjust path for user authentication

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { orderId, setOrderId } = useOrder(); // Access context
  const { user } = useAuth(); // Access user authentication context

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState("Under Processing");

  const totalPrice = useMemo(() => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  }, [cart]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      ...formData,
      items: cart,
      totalPrice,
      createdAt: new Date(),
      deliveryStatus,
    };

    try {
      // Add the new order to the 'orders' collection
      const ordersCollectionRef = collection(firestore, 'orders');
      const docRef = await addDoc(ordersCollectionRef, orderData);
      const generatedOrderId = docRef.id;
      setOrderId(generatedOrderId); // Set orderId in context

      // Use email as the unique ID for user document
      if (user) {
        const userDocRef = doc(firestore, 'users', user.email);
        console.log("Fetching user document:", userDocRef.path);

        // Create or update the user document
        await setDoc(userDocRef, {
          ...formData,
          createdAt: new Date(),
        }, { merge: true }); // Merge to avoid overwriting existing data

        // Optionally update the user's orders array
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const updatedOrders = userData.orders ? [...userData.orders, generatedOrderId] : [generatedOrderId];
          await updateDoc(userDocRef, { orders: updatedOrders });
        } else {
          console.error("User document does not exist");
        }
      } else {
        console.error("User is not authenticated");
      }

      console.log("Order successfully saved to Firebase with ID:", generatedOrderId);
      setSuccess(true);
      clearCart();
    } catch (error) {
      console.error("Error saving order to Firebase: ", error.message);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      const fetchOrderStatus = async () => {
        try {
          const orderDocRef = doc(firestore, "orders", orderId);
          const orderDoc = await getDoc(orderDocRef);
          if (orderDoc.exists()) {
            setDeliveryStatus(orderDoc.data().deliveryStatus || "Not Available");
          } else {
            console.error("Order not found");
          }
        } catch (error) {
          console.error("Error fetching order status:", error.message);
        }
      };

      fetchOrderStatus();
    }
  }, [orderId]);

  return (
    <section className="border-t border-b border-primary flex items-center justify-center flex-col p-3">
      <h2 className="text-2xl text-center font-bold mt-4">Checkout</h2>
      <div className="my-24 w-[80%] border p-4 bg-white shadow-md rounded-md">
        {success ? (
          <div className="text-center flex flex-col gap-3">
            <h3 className="text-2xl font-bold text-green-500">
              Order placed successfully!
            </h3>
            <p>
              Your order ID is: <strong>{orderId}</strong>
            </p>
            <p>
              Delivery Status: <strong>{deliveryStatus}</strong>
            </p>
            <p>
              Thank you for your purchase. You will receive a confirmation email
              soon.
            </p>
            <Link href="/allproducts">
              <button className="bg-[#5b5c70] font-bold hover:underline hover:bg-primary text-white p-3 px-7 hover:scale-95 transition-all duration-700 ease-in-out rounded-md mt-4">
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : cart.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center">
            <p className="text-primary my-3 text-3xl md:text-5xl">
              Your cart is empty
            </p>
            <p>
              Delivery Status: <strong className="text-black">{deliveryStatus}</strong>
            </p>
            <Link href="/allproducts">
              <button className="bg-[#5b5c70] mt-2 font-bold hover:underline hover:bg-primary text-white p-3 px-7 hover:scale-95 transition-all duration-700 ease-in-out rounded-md">
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleCheckout}>
            <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="p-2 border rounded focus:outline-none focus:ring-0 focus:border-gray-300"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="p-2 border rounded focus:outline-none focus:ring-0 focus:border-gray-300"
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                className="p-2 border rounded focus:outline-none focus:ring-0 focus:border-gray-300"
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                className="p-2 border rounded focus:outline-none focus:ring-0 focus:border-gray-300"
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleInputChange}
                className="p-2 border rounded focus:outline-none focus:ring-0 focus:border-gray-300"
                required
              />
              <input
                type="text"
                name="zipCode"
                placeholder="Zip Code"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="p-2 border rounded focus:outline-none focus:ring-0 focus:border-gray-300"
                required
              />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="p-2 border rounded focus:outline-none focus:ring-0 focus:border-gray-300"
                required
              />
            </div>

            <h3 className="text-xl font-semibold my-4">Order Summary</h3>
            <div className="bg-gray-100 p-4 rounded-md mb-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <p>{item.name}</p>
                  <p>
                    {item.quantity} x {item.price}
                  </p>
                </div>
              ))}
              <div className="flex justify-between font-bold mt-4">
                <p>Total</p>
                <p className="flex items-center">
                  <FaIndianRupeeSign />
                  {totalPrice}
                </p>
              </div>
            </div>
            <button
              type="submit"
              className="bg-[#5b5c70] font-bold hover:underline hover:bg-primary text-white p-3 px-7 hover:scale-95 transition-all duration-700 ease-in-out rounded-md"
              disabled={loading}
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
