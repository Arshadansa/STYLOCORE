"use client";

import Image from "next/image";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import Loader from "../loader/loader";

export default function Carousel({ products }) {
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
    <section className="relative overflow-hidden">
     
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 focus:outline-none z-10"
      >
        <FaChevronLeft className="text-white w-8 h-8 md:w-10 md:h-10" />
      </button>

      
      <div
        ref={carouselRef}
        className="flex gap-4  md:gap-8 overflow-x-auto scroll-smooth mt-5"
      >
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="w-72 border flex-shrink-0 rounded-2xl shadow-sm"
            >
              <div className="relative">
                <Image
                  width={300}
                  height={400}
                  onClick={() => handleNavigation(product.id)}
                  src={
                    product.colors && product.colors.length > 0
                      ? product.colors[0].images[0]
                      : "/path/to/default-image.jpg"
                  }
                  alt={product.name}
                  className="rounded-3xl mx-auto mb-4"
                />
              </div>
              <div className="flex px-2 gap-1 mt-2">
                {product.colors.map((color, index) => (
                  <div key={index} className="flex items-center space-x-2 ">
                    <span
                      className="w-6 h-6 border rounded-full"
                      style={{ backgroundColor: color.hex_code }}
                      title={color.color_name}
                    />
                  </div>
                ))}
              </div>
              <h3 className="mt-1 text-xl text-[#67656f] text-center font-semibold">
                {product.name || "Unnamed Product"}
              </h3>
              <p className="flex text-lg text-productPrice w-full justify-center items-center">
                Price:&nbsp;
                <FaIndianRupeeSign className="text-sm" />
                {product.price || "N/A"}
              </p>
            </div>
          ))
        ) : (
          <Loader />
        )}
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
