"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Loader from "../loader/Loader";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

export default function Carousel({ products }) {
  const router = useRouter();
  const carouselRef = useRef(null);

  const [loadingImages, setLoadingImages] = useState(
    Array(products.length).fill(true)
  );
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const handleNavigation = (productId) => {
    router.push(`/collections-product/${productId}`);
  };

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

  const handleImageLoad = (index) => {
    setLoadingImages((prev) => {
      const newLoadingImages = [...prev];
      newLoadingImages[index] = false;
      return newLoadingImages;
    });
  };

  const handleScroll = () => {
    const carousel = carouselRef.current;
    if (carousel) {
      setIsAtStart(carousel.scrollLeft === 0);
      setIsAtEnd(
        Math.ceil(carousel.scrollLeft + carousel.clientWidth) >=
          carousel.scrollWidth
      );
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", handleScroll);
      handleScroll();

      return () => {
        carousel.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <section className="relative overflow-hidden">
      {products.length > 1 && !isAtStart && (
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 focus:outline-none z-10"
        >
          <FaChevronLeft className="text-white w-8 h-8 md:w-10 md:h-10" />
        </button>
      )}

      <div
        ref={carouselRef}
        className="flex gap-4 items-start justify-center md:justify-normal md:items-start md:px-28 md:gap-8 overflow-x-auto scrollbar-hidden mt-5"
      >
        {products.length > 0 ? (
          products.map((product, index) => (
            <div
              key={product.id}
              className="w-72 border flex-shrink-0 rounded-3xl shadow-sm"
            >
              <div className="relative">
                {loadingImages[index] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 rounded-3xl">
                    <Loader />
                  </div>
                )}
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
                  className="rounded-3xl hover:cursor-pointer mx-auto mb-4"
                  onLoadingComplete={() => handleImageLoad(index)}
                />
              </div>
              <div className="flex px-2 gap-1 mt-2">
                {product.colors.map((color, colorIndex) => (
                  <div key={colorIndex} className="flex items-center space-x-2">
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
          <div className="flex items-center justify-center bg-opacity-50 ">
            <ClipLoader color="#ffffff" size={80} />
          </div>
        )}
      </div>

      {products.length > 1 && !isAtEnd && (
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 focus:outline-none z-10"
        >
          <FaChevronRight className="text-white w-8 h-8 md:w-10 md:h-10" />
        </button>
      )}
    </section>
  );
}
