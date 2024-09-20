"use client";

import { useEffect, useState } from "react";
import Products from "../Components/NewArrival/Products";
import { fetchProductsByTag } from '../lib/firebase'; // Adjust the path as necessary
import Loader from "../Components/loader/Loader"; // Import your loader component

export default function Mens() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const gender = "Men"; 

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true); // Start loading
      const fetchedProducts = await fetchProductsByTag(gender);
      setProducts(fetchedProducts);
      setLoading(false); // Stop loading
    };

    getProducts();
  }, [gender]);
  
  return (
    <section className="flex w-full border-primary border-t border-b items-center justify-center pb-[48px] pt-[24px] md:pt-[48px]">
      <div className="flex flex-col items-center justify-center gap-[24px] sm:max-w-[95%] md:max-w-screen-xl md:gap-[48px]">
        <h2 className="w-full text-secondary text-center font-lora text-[clamp(28px,20px_+_2vw,40px)] font-medium text-veryDarkPurple">
          Mens
        </h2>
        {loading ? ( 
          <Loader />
        ) : (
          <Products allProducts={products} />
        )}
      </div>
    </section>
  );
}
