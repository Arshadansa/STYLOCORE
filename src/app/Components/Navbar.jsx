"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { MdOutlineAccountCircle } from "react-icons/md";
import Logo from "./Logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  return (
    <nav className={`  w-full transition-opacity duration-300`}>
      <div className="max-w-screen-2xl flex  flex-wrap items-center justify-between mx-auto px-12 p-4">
        <Logo />
        <div className="flex md:order-2    space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div className="flex justify-start  items-center gap-3">
            <div className=" group hover:cursor-pointer">
              <CiSearch
                size={34}
                className="text-black group-hover:text-primary transition-colors duration-300"
              />
            </div>
            <Link href={"/"}>
              <span className=" group">
                <MdOutlineAccountCircle size={34} className=" font-thin " />
              </span>
            </Link>

            <Link href="/cart">
              <span className=" relative  group">
                <HiOutlineShoppingBag size={34} />
                <span className="text-white rounded-full px-1.5 bottom-4 left-5 bg-primary absolute text-[10px]">
                  {1}
                </span>
              </span>
            </Link>
          </div>

          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <ul className="flex  flex-col text-black  font-medium p-4 md:p-0 mt-4  rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 ">
            <li className="hover:underline  hover:text-[#9896bc] transition-all duration-700 ease-in-out">
              <Link href="/">
                <span>Home</span>
              </Link>
            </li>

            <li>
              <div
                className="relative inline-block text-left "
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="text-black hover:text-primary font-medium rounded-lg text-center inline-flex items-center"
                  type="button"
                >
                  All products
                  <IoIosArrowDown
                    className={`ml-2 transition-transform duration-200 ${
                      isOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            </li>
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : +40 }}
              transition={{ duration: 0.8 }}
              className={`z-10 bg-[#fafcfb] divide-y right-0   mt-12 h-96  border w-[100vw] dark:bg-gray-700 absolute  ${
                isOpen ? "block" : "hidden"
              }`}
            >
              <div className=" text-black ">
                <Link href="/collections/rings">
                  <span>Product-1</span>
                </Link>
                <Link href="/collections/rings">
                  <span>Product-2</span>
                </Link>
                <Link href="/collections/rings">
                  <span>Product-3</span>
                </Link>
                <Link href="/collections/rings">
                  <span>Product-4</span>
                </Link>
              </div>
            </motion.div>
            <li className="hover:underline  hover:text-[#9896bc] transition-all duration-700 ease-in-out">
              <Link href="/best-seller">
                <span>Best Sellers</span>
              </Link>
            </li>
            <li className="hover:underline  hover:text-[#9896bc] transition-all duration-700 ease-in-out">
              <Link href="/mens">
                <span>Mens</span>
              </Link>
            </li>
            <li className="hover:underline  hover:text-[#9896bc] transition-all duration-700 ease-in-out">
              <Link href="/womens">
                <span>Women's</span>
              </Link>
            </li>
            <li className="hover:underline  hover:text-[#9896bc] transition-all duration-700 ease-in-out">
              <Link href="/kids">
                <span>Kids </span>
              </Link>
            </li>
            <li className="hover:underline  hover:text-[#9896bc] transition-all duration-700 ease-in-out">
              <Link href="/about-us">
                <span>About us</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
