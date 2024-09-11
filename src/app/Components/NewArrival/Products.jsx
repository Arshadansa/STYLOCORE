"use client"; // Ensure this is placed at the top of the file for client-side rendering

import { useRouter } from "next/navigation"; // Use next/navigation for App Router navigation
import Image from "next/image";

export default function Products({ allProducts }) {
  const router = useRouter();

  // Handle navigation to the single product page
  const handleNavigation = (productId) => {
    router.push(`/collections-mens-product/${productId}`);
  };

  return (
    <div className="grid w-full grid-cols-2 items-start justify-center gap-x-[4px] gap-y-[16px] xs:gap-x-[16px] md:gap-[32px] lg:grid-cols-3">
      {allProducts.map((product) => (
        <div key={product.id} className="rounded-lg">
          {/* Ensure the image has the correct width and height set, and handle onClick for navigation */}
          <Image
            src={product.image}
            alt={product.name}
            width={340}
            height={500}
            className="rounded-2xl hover:cursor-pointer w-80 h-96"
            onClick={() => handleNavigation(product.id)} // Navigate to product detail page on click
          />
          <div className="mt-4 text-center">
            <h3 className="text-xl text-[#67656f] font-semibold">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p> {/* Ensure price has $ symbol */}
          </div>
        </div>
      ))}
    </div>
  );
}
