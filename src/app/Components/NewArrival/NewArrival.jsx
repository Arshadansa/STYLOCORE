"use client";

import Link from "next/link";
// Components
import Products from "../NewArrival/Products";
import { fetchAllProducts } from "../../lib/firebase";
import { useEffect, useState } from "react";
import Loader from "../loader/Loader"; // Import your loader component

export default function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true); // Start loading
      try {
        const fetchedProducts = await fetchAllProducts();
        console.log("Fetched products:", fetchedProducts); // Log product data
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching all products:", error);
      } finally {
        setLoading(false); // Stop loading in both success and error cases
      }
    };

    getProducts();
  }, []);

  return (
    <section className="flex w-full items-center justify-center pb-[48px] pt-[24px] md:pt-[48px]">
      <div className="flex flex-col items-center justify-center gap-[24px] sm:max-w-[95%] md:max-w-screen-xl md:gap-[48px]">
        <h2 className="w-full text-center font-lora text-[clamp(28px,20px_+_2vw,40px)] font-medium text-veryDarkPurple md:text-left">
          New Arrivals
        </h2>
        {loading ? ( // Show loader if loading
          <Loader />
        ) : (
          <Products allProducts={products} />
        )}
        <Link
          href="/allproducts"
          className="bg-[#dfdeec] font-bold hover:underline hover:bg-primary hover:text-white mt-12 text-[#545363] p-3 px-7 hover:scale-95 transition-all duration-700 ease-in-out rounded-md"
        >
          View More
        </Link>
      </div>
    </section>
  );
}
