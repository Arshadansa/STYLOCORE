"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { FaIndianRupeeSign } from "react-icons/fa6";

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
      const itemWidth = carouselRef.current.firstChild.offsetWidth + 16; // Add gap between images
      carouselRef.current.scrollBy({ left: -itemWidth, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.firstChild.offsetWidth + 16; // Add gap between images
      carouselRef.current.scrollBy({ left: itemWidth, behavior: "smooth" });
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
    if (carouselRef.current) {
      const carousel = carouselRef.current;
      setIsAtStart(carousel.scrollLeft <= 0);
      setIsAtEnd(
        Math.ceil(carousel.scrollLeft + carousel.clientWidth) >=
          carousel.scrollWidth - 1
      );
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.addEventListener("scroll", handleScroll);
      handleScroll(); // Check initial scroll position
      return () => {
        carouselRef.current.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const showArrows = products.length > 2;

  return (
    <section className="relative max-w-3xl mx-auto overflow-hidden">
      {products.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl font-semibold">No products available</p>
        </div>
      ) : (
        <>
          {showArrows && !isAtEnd && (
            <button
              onClick={scrollRight}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 z-10 hidden md:block"
            >
              <FaChevronRight className="text-white w-8 h-8 md:w-10 md:h-10" />
            </button>
          )}

          <div
            ref={carouselRef}
            className="flex gap-4 items-start justify-start overflow-x-auto scrollbar-hide mt-5 snap-x snap-mandatory"
          >
            {products.map((product, index) => (
              <div
                key={product.id}
                className="w-72 border flex-shrink-0 rounded-3xl shadow-sm snap-start"
              >
                <div className="relative">
                  {loadingImages[index] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                      <ClipLoader color="#ffffff" size={80} />
                    </div>
                  )}
                  <Image
                    width={300}
                    height={400}
                    onClick={() => handleNavigation(product.id)}
                    src={
                      product.colors?.[0]?.images?.[0] ||
                      "/path/to/default-image.jpg"
                    }
                    alt={product.name || "Unnamed Product"}
                    className="rounded-3xl hover:cursor-pointer mx-auto mb-4"
                    onLoadingComplete={() => handleImageLoad(index)}
                  />
                </div>

                <div className="flex px-2 gap-1 mt-2">
                  {product.colors.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="w-6 h-6 border rounded-full"
                      style={{ backgroundColor: color.hex_code }}
                      title={color.color_name}
                    />
                  ))}
                </div>

                <h3 className="mt-1 text-xl text-center font-semibold">
                  {product.name || "Unnamed Product"}
                </h3>

                <p className="flex text-lg text-center items-center justify-center mt-2 mb-4">
                  Price:&nbsp;
                  <FaIndianRupeeSign className="text-sm" />
                  {product.price || "N/A"}
                </p>
              </div>
            ))}
          </div>

          {showArrows && !isAtEnd && (
            <button
              onClick={scrollLeft}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 z-10 hidden md:block"
            >
              <FaChevronLeft className="text-white w-8 h-8 md:w-10 md:h-10" />
            </button>
          )}
        </>
      )}
    </section>
  );
}