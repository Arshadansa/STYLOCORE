import { useRouter } from "next/navigation";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useState } from "react";
import Loader from "../loader/Loader"; // Ensure you have a Loader component

export default function Products({ allProducts }) {
  const router = useRouter();

  // Create an array to keep track of loading state for each product image
  const [loadingImages, setLoadingImages] = useState(Array(allProducts.length).fill(true));

  const handleNavigation = (productId) => {
    router.push(`/collections-product/${productId}`);
  };

  const handleImageLoad = (index) => {
    setLoadingImages((prev) => {
      const newLoadingImages = [...prev];
      newLoadingImages[index] = false; // Mark the image at the given index as loaded
      return newLoadingImages;
    });
  };

  return (
    <div className="grid w-full grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6 p-4">
      {allProducts.map((product, index) => (
        <section
          key={product.id}
          className="hover:cursor-pointer flex flex-col justify-center items-center border rounded-3xl p-4 w-full max-w-[280px] sm:max-w-[300px] lg:max-w-[320px] mx-auto transition-transform duration-300 hover:scale-105"
        >
          <div className="relative mb-4 w-full">
            {loadingImages[index] && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 rounded-3xl">
                <Loader /> {/* Display your Loader component here */}
              </div>
            )}
            <img
              width={300}
              height={400}
              onClick={() => handleNavigation(product.id)}
              src={
                product.colors && product.colors.length > 0
                  ? product.colors[0].images[0]
                  : "/path/to/default-image.jpg"
              }
              alt={product.name}
              className="rounded-3xl hidden md:block w-full h-auto object-cover"
              onLoad={() => handleImageLoad(index)} // Mark this image as loaded
            />
            <img
              width={100}
              height={100}
              onClick={() => handleNavigation(product.id)}
              src={
                product.colors && product.colors.length > 0
                  ? product.colors[0].images[0]
                  : "/path/to/default-image.jpg"
              }
              alt={product.name}
              className="rounded-3xl md:hidden w-full h-auto object-cover"
              onLoad={() => handleImageLoad(index)} // Mark this image as loaded
            />
          </div>
          <p className="text-productPrice my-2 font-medium text-center text-xl">
            {product.name}
          </p>
          <p className="flex text-lg text-productPrice w-full justify-center items-center">
            Price:&nbsp;
            <FaIndianRupeeSign className="text-sm" />
            {Object.values(product?.colors[0]?.sizes_inventory)[0]?.price}
          </p>
          <div className="flex gap-2 mt-2">
            {product.colors.map((color, colorIndex) => (
              <div key={colorIndex} className="flex items-center space-x-2 mb-1">
                <span
                  className="w-6 h-6 border rounded-full"
                  style={{ backgroundColor: color.hex_code }}
                  title={color.color_name}
                />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
