"use client";

import Image from "next/image";
import logo from "../../Assets/Images/logo.png"; 
import videoSrcMp4 from "../../Assets/Video/clothing-shoot.mp4"; 

export default function Hero() {
  return (
    <section className="">
      <div className="pointer-events-none border border-[#9896bc] relative h-[470px] select-none md:h-[calc(100vh_-_80px)]">
        <video
          playsInline
          muted
          loop
          autoPlay
          preload="auto"
          className="absolute h-full w-full object-cover"
        >
          <source src={videoSrcMp4} type="video/mp4" /> {/* Make sure mp4 path is correct */}
          Your browser does not support the video tag.
        </video>
        <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8">
          {/* Use the Image component to render the logo */}
          <Image src={logo} alt="Logo" width={100} height={100} /> {/* Adjust width and height accordingly */}
        </div>
      </div>
    </section>
  );
}
