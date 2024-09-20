'use client';

import Link from "next/link";


export default function NoProduct() {
  return (
    <div className="fixed inset-0 flex flex-col text-3xl text-white items-center justify-center bg-black bg-opacity-50 z-50">
      <p>No product data available.</p>
      <Link href="/allproducts">
        <button className="bg-[#5b5c70] font-bold hover:underline hover:bg-primary text-white p-3 px-7 hover:scale-95 transition-all duration-700 ease-in-out rounded-md mt-4">
          Continue Shopping
        </button>
      </Link>
    </div>
  );
}
