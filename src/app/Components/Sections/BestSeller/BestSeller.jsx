"use client";

import { useEffect, useState } from "react";
import Carousel from "../Carousel";
import { fetchProductsByTag } from "../../../lib/firebase"; // Ensure this fetch function is correct

const categories = ["Men", "Women", "Kids", "BestSeller"];

export default function BestSellers() {
  const [gender, setGender] = useState("Men");
  const [products, setProducts] = useState([]);

  const handleCategoryChange = (category) => {
    setGender(category);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const fetchedProducts = await fetchProductsByTag(gender);
        setProducts(fetchedProducts);
        console.log(fetchedProducts); // Check what is being fetched
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, [gender]);

  return (
    <section className="md:my-32 my-12 p-4 max-w-screen-lg mx-auto">
      <div className="flex items-center gap-5 flex-wrap justify-between">
        <div>
          <h2 className="text-4xl font-semibold text-center">Best Sellers</h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center space-x-4 items-center md:space-x-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`pb-2 ${
                gender === category
                  ? "text-indigo-500 border-b-2 border-indigo-500"
                  : "text-gray-500"
              }`}
            >
              <span className="text-2xl">{category}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Product Slider */}
      <Carousel products={products} category={gender} />
    </section>
  );
}
