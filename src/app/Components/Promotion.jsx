"use client";

import Link from "next/link";

import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import promotion from "../../Assets/Images/promotion.jpg"

export default function Promotions() {
  return (
    <ParallaxProvider>
      <div className="relative h-[570px] overflow-hidden sm:h-screen">
        <h2 className="sr-only text-black">Promotions</h2>

        {/* Parallax Effect for Desktop */}
        <Parallax
          speed={-50}
          className="relative hidden h-full w-full sm:block"
        >
          <img
            src="https://res.cloudinary.com/dxziq8zr8/image/upload/v1727074392/rtwiskvljocipwgewc52.jpg"
            alt="winter collection"
            className="object-cover w-full h-full"
          />
        </Parallax>

        {/* Static Image for Mobile */}
        <div className="relative block h-full w-full sm:hidden">
          <img
            src="https://res.cloudinary.com/dxziq8zr8/image/upload/v1727074392/rtwiskvljocipwgewc52.jpg"
            alt="winter collection"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Promotional Text */}
        <div className="absolute right-[5%] top-[50%] flex w-[65%] max-w-[610px] flex-col items-center justify-center gap-[16px] rounded-[16px] bg-white/30 p-[16px] text-center -translate-y-1/2 md:gap-[32px] md:p-[32px]">
          <h3 className="font-lora text-[clamp(24px,14px_+_2vw,50px)] font-bold leading-[1.5] text-white drop-shadow-md">
            Stay Stylish,
            <br />
            Stay Comfortable
          </h3>
          <p className="text-[clamp(12px,10px_+_2vw,22px)] font-semibold text-veryDarkPurple drop-shadow-md">
            Elevate your style no matter the season with our versatile and chic
            collection. Cozy up, cool down, and feel fabulous all year round!
          </p>
          <Link href={"/about-us"}>
            <button className="bg-[#5b5c70] font-bold hover:underline hover:bg-primary text-white p-3 px-7 hover:scale-95 transition-all duration-700 ease-in-out rounded-md">
              About Us
            </button>
          </Link>
        </div>
      </div>
    </ParallaxProvider>
  );
}
