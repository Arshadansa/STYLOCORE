"use client";

import Image from "next/image";

export default function Products({allProducts}) {


  return (
    <div className="grid w-full grid-cols-2  items-start justify-center gap-x-[4px] gap-y-[16px] xs:gap-x-[16px] md:gap-[32px] lg:grid-cols-3">
      {allProducts.map((product) => (
        <div key={product.id} className="  rounded-lg">
          <Image
            src={product.image}
            alt={product.name}
            width={340} 
            height={500}
            className="rounded-2xl hover:cursor-pointer w-80 h-96"
          />
          <div className="mt-4 text-center">
            <h3 className="text-xl text-[#67656f] font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
