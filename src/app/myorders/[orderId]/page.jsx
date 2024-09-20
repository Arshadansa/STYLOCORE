"use client";

import { useState, useEffect } from "react";
import { firestore } from "../../lib/firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import TabContent from "../../Components/TabContent";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loader from "@/app/Components/loader/loader";
import NoProduct from "@/app/Components/loader/NoProduct";

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("All Orders");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchUserOrders(user);
      } else {
        setError("User not signed in");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserOrders = async (user) => {
    try {
      const userDocRef = doc(firestore, "users", user.email);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        throw new Error("User not found.");
      }

      const userData = userDoc.data();
      const userOrders = userData.orders || [];

      if (userOrders.length === 0) {
        throw new Error("No orders found for this user.");
      }

      const ordersCollection = collection(firestore, "orders");
      const chunkSize = 10;
      const orderChunks = [];
      for (let i = 0; i < userOrders.length; i += chunkSize) {
        const chunk = userOrders.slice(i, i + chunkSize);
        const ordersQuery = query(
          ordersCollection,
          where("__name__", "in", chunk)
        );
        orderChunks.push(getDocs(ordersQuery));
      }

      const allOrdersSnapshots = await Promise.all(orderChunks);
      const ordersData = [];
      allOrdersSnapshots.forEach((snapshot) => {
        snapshot.docs.forEach((doc) => {
          ordersData.push({
            id: doc.id,
            ...doc.data(),
          });
        });
      });

      setOrders(ordersData);
    } catch (err) {
      console.error("Error fetching user orders:", err);
      setError(err.message || "Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <NoProduct />;
  }

  return (
    <section className="h-full border-primary border-t border-b py-5">
      <h2 className="w-full text-secondary text-center font-lora text-[clamp(28px,20px_+_2vw,40px)] font-medium text-veryDarkPurple">
        All Orders
      </h2>
      <div className="max-w-screen-xl py-20 h-full mx-auto">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mb-10">
          <div className="flex  lg:flex-row items-center justify-center lg:justify-between">
            <ul className="flex  items-center gap-x-11 gap-y-3">
              {["All Orders", "Completed", "Cancelled"].map((tab) => (
                <li
                  key={tab}
                  className={`font-medium text-lg leading-8 cursor-pointer transition-all duration-500 ${
                    activeTab === tab ? "text-indigo-600" : "text-black"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-md">
            <TabContent activeTab={activeTab} orders={orders} />
          </div>
        </div>
      </div>
    </section>
  );
}
