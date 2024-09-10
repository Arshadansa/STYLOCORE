"use client";

import Link from "next/link";
// components
import Products from "../NewArrival/Products";

import { products } from "@/app/Data/products"; 
export default function NewArrivals() {
  const allProducts = products.Accessories; 
  return (
    <section className="flex w-full items-center justify-center pb-[48px] pt-[24px] md:pt-[48px]">
      <div className="flex flex-col items-center justify-center gap-[24px] sm:max-w-[95%] md:w-[904px] md:gap-[48px]">
        <h2 className="w-full text-center font-lora text-[clamp(28px,20px_+_2vw,40px)] font-medium text-veryDarkPurple md:text-left">
          New Arrivals
        </h2>
        <Products allProducts={allProducts} />
        <Link
          href="/"
          className="btn text-[clamp(18px,10px_+_2vw,22px)]"
        >
          View More
        </Link>
      </div>
    </section>
  );
}
