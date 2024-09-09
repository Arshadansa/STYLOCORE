"use client";

import Logo from "./Logo";


function Hero() {
  return (
    <section classname="">
      <div className="pointer-events-none border border-[#9896bc] relative h-[470px] select-none md:h-[calc(100vh_-_80px)]">
        <video
          playsInline
          muted
          loop
          autoPlay
          preload="auto"
          className="absolute h-full w-full object-cover"
        >
          <source src="/videos/clothing-shoot.webm" type="video/webm" />
          <source src="/videos/clothing-shoot.mp4" type="video/mp4" />
        </video>
        <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8">
          <Logo />
        </div>
      </div>
    
    </section>
  );
}

export default Hero;
