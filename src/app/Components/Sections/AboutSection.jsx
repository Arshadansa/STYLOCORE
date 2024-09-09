import React from "react";

export default function AboutSection() {
  return (
    <section className="py-32  w-full flex bg-aboutsection items-center justify-center border border-primary">
      <div className="max-w-screen-md  text-center mx-auto text-xl ">
        <h2 className="text-[#32323c] text-5xl font-bold">
          {" "}
          Welcome to Stylacor
        </h2>
        <p className="mt-5 text-[#7c7b8b]">
          {" "}
          where timeless elegance meets contemporary flair
        </p>
        <p className="text-[#7c7b8b] leading-8 ">
          At Stylacor, we are dedicated to crafting exceptional fashion that
          transcends trends and speaks to the essence of individuality.
        </p>
        <button className="bg-[#5b5c70] font-bold hover:underline hover:bg-primary mt-12 text-white p-3 px-7 hover:scale-95 transition-all duration-700 ease-in-out rounded-md">
          About Us
        </button>
      </div>
    </section>
  );
}
