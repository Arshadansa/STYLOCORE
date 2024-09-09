"use client";

import Image from "next/image";
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
              <span className="absolute top-0 left-0 bg-[#efeff1]/30 text-xl font-bold p-3  rounded-br-xl">
                {product.rank}
              </span>
              <Image
                src="/images/natural.png" // Leading slash is important
                alt="Natural Image"
                width={340} // Set appropriate width and height
                height={500}
                className="rounded-2xl w-80 h-96"
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
