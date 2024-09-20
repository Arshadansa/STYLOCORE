"use client";

// next
import Image from "next/image";
import Link from "next/link";

// react-scroll-parallax
import { Parallax, ParallaxProvider } from "react-scroll-parallax";

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
          <Image
            src="/images/portrait-woman-winter-clothing.avif" // Ensure this image exists in the 'public/images/promotions' folder
            alt="winter collection"
            fill
            sizes="(min-width: 768px) 90vw, 867px"
            className="object-cover"
          />
        </Parallax>

        {/* Static Image for Mobile */}
        <div className="relative block h-full w-full sm:hidden">
          <Image
            src="/images/portrait-woman-winter-clothing.avif"
            alt="winter collection"
            fill
            sizes="(min-width: 768px) 100vw, 867px"
            className="object-cover"
          />
        </div>

        {/* Promotional Text */}
        <div className="absolute right-[5%] top-[50%] flex w-[65%] max-w-[610px] flex-col items-center justify-center gap-[16px] rounded-[16px] bg-white/30 p-[16px] text-center -translate-y-1/2 md:gap-[32px] md:p-[32px]">
          <h3 className="font-lora text-[clamp(24px,14px_+_2vw,60px)] font-bold leading-[1.5] text-white drop-shadow-md">
            Keep Cozy,
            <br />
            Stay Chic
          </h3>
          <p className="text-[clamp(18px,10px_+_2vw,32px)] font-semibold text-veryDarkPurple drop-shadow-md">
            Wrap yourself in style this winter with our cozy and fashionable
            collection!
          </p>
          <Link href={"/about-us"}>
            <button className="bg-[#5b5c70] font-bold hover:underline hover:bg-primary  text-white p-3 px-7 hover:scale-95 transition-all duration-700 ease-in-out rounded-md">
              About Us
            </button>
          </Link>
        </div>
      </div>
    </ParallaxProvider>
  );
}
