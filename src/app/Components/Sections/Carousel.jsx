"use client";

import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Carousel({ products, category }) {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden scrollbar-hide">
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 focus:outline-none z-10"
      >
        <FaChevronLeft className="text-white w-8 h-8 md:w-10 md:h-10" />
      </button>

      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide mt-5"
        >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-72 flex-shrink-0 rounded-2xl shadow-sm"
          >
            <div className="relative">
              <span className="absolute top-0 left-0 bg-[black]/30 text-lg font-bold px-2 py-1  rounded-md">
                {product.rank}
              </span>
              <img
                src="https://clothing-store.rashidshamloo.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0636%2F4417%2F2477%2Ffiles%2Fnatural-04.jpg%3Fv%3D1700505794&w=384&q=75"
                alt={product.name}
                className="w-72 h-96 object-cover rounded-2xl"
              />
            </div>
            <h3 className="mt-4 text-xl text-[#67656f] text-center font-semibold">
              {product.name}
            </h3>
            <p className="text-center text-gray-600">{product.price}</p>
          </div>
        ))}
      </div>

      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 focus:outline-none z-10"
      >
        <FaChevronRight className="text-white w-8 h-8 md:w-10 md:h-10" />
      </button>
    </section>
  );
}
