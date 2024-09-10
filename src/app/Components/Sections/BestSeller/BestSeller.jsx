"use client";

import { useState } from "react";
import Carousel from "../Carousel";
const categories = ["Mens", "Womens", "Kids", "BestSellers"];

const products = {
  BestSellers: [
    {
      id: 1,
      rank: "1st",
      name: "Clear Earrings",
      price: "¥20,900",
      image: "/images/earrings.jpg",
    },
    {
      id: 2,
      rank: "2nd",
      name: "Pearl Emotion Bracelet",
      price: "¥16,500",
      image: "/images/bracelet.jpg",
    },
    {
      id: 3,
      rank: "2nd",
      name: "Pearl Emotion Bracelet",
      price: "¥16,500",
      image: "/images/bracelet.jpg",
    },
    {
      id: 4,
      rank: "2nd",
      name: "Pearl Emotion Bracelet",
      price: "¥16,500",
      image: "/images/bracelet.jpg",
    },
  ],
  Kids: [
    {
      id: 1,
      rank: "1st",
      name: "Clear Earrings",
      price: "¥20,900",
      image: "/images/earrings.jpg",
    },
    {
      id: 2,
      rank: "2nd",
      name: "Pearl Emotion Bracelet",
      price: "¥16,500",
      image: "/images/bracelet.jpg",
    },
    {
      id: 3,
      rank: "2nd",
      name: "Pearl Emotion Bracelet",
      price: "¥16,500",
      image: "/images/bracelet.jpg",
    },
    {
      id: 4,
      rank: "2nd",
      name: "Pearl Emotion Bracelet",
      price: "¥16,500",
      image: "/images/bracelet.jpg",
    },
  ],
  Womens: [
    {
      id: 1,
      rank: "1st",
      name: "Clear Earrings",
      price: "¥20,900",
      image: "/images/earrings.jpg",
    },
    {
      id: 2,
      rank: "2nd",
      name: "Pearl Emotion Bracelet",
      price: "¥16,500",
      image: "/images/bracelet.jpg",
    },
    {
      id: 3,
      rank: "2nd",
      name: "Pearl Emotion Bracelet",
      price: "¥16,500",
      image: "/images/bracelet.jpg",
    },
    {
      id: 4,
      rank: "2nd",
      name: "Pearl Emotion Bracelet",
      price: "¥16,500",
      image: "/images/bracelet.jpg",
    },
  ],
  Mens: [
    {
      id: 1,
      rank: "1st",
      name: "Clear Earrings",
      price: "¥20,900",
      image: "/images/earrings.jpg",
    },
    {
      id: 2,
      rank: "2nd",
      name: "Pearl Emotion Bracelet",
      price: "¥16,500",
      image: "/images/bracelet.jpg",
    },
    {
      id: 3,
      rank: "2nd",
      name: "Pearl Emotion Bracelet",
      price: "¥16,500",
      image: "/images/bracelet.jpg",
    },
    {
      id: 4,
      rank: "2nd",
      name: "Pearl Emotion Bracelet",
      price: "¥16,500",
      image: "/images/bracelet.jpg",
    },
  ],
};

export default function BestSellers() {
  const [activeCategory, setActiveCategory] = useState("BestSellers");

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <section className="p-6 max-w-screen-lg mx-auto ">
      <div className="flex items-center gap-5 flex-wrap justify-between">
        <div>
          <h2 className="text-4xl font-semibold text-center ">Best Sellers</h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center space-x-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`pb-2 ${
                activeCategory === category
                  ? "text-indigo-500  border-b-2 border-indigo-500"
                  : "text-gray-500"
              }`}
            >
              <span className="text-2xl">{category}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Product Slider */}

      <Carousel products={products[activeCategory]} category={activeCategory} />
    </section>
  );
}
