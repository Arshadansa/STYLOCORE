"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { MdOutlineAccountCircle } from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import Logo from "./Logo";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from '../context/cartContext'; 
import { useOrder } from '../context/orderContext'; // Adjust path


export default function Navbar() {
  const {  itemCount } = useCart();
  const { orderId } = useOrder(); // Access orderId from context

  const [isOpen, setIsOpen] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isViewSearch, setIsViewSearch] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
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

  const handleHoverEnter = () => {
    setIsView(true);
  };

  const handleHoverOut = () => {
    setTimeout(() => {
      setIsView(false);
    }, 3000);
  };

  useEffect(() => {
    // Track authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(true); // User is logged in
      } else {
        setIsLogin(false); // User is logged out
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Logged out successfully!");
    } catch (err) {
      console.error("Error logging out:", err.message);
    }
  };

  const handleSearch = () => {
    setIsViewSearch(!isViewSearch);
  };

  useEffect(() => {
    console.log("Current Order ID:", orderId);
  }, [orderId]);
  
  return (
    <nav className={`w-full transition-opacity duration-300`}>
      <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto md:px-12 p-4">
        <Logo />
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div className="flex  justify-start items-center gap-3">
            {/* <div className="group hover:cursor-pointer">
              <CiSearch
                onClick={handleSearch}
                size={34}
                className="text-black group-hover:text-primary transition-colors duration-300"
              />
            </div> */}

            {/* {isViewSearch && (
              <div className="h-12 left-0 z-40 top-24 w-[100vw] bg-[#e1e0dd]/30 md:bg-[#e1e0dd]/50 absolute flex items-center justify-center">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-[70%] md:max-w-md px-4 py-1 focus:outline-none focus:ring-0 focus:border-gray-300 placeholder:text-sm rounded"
                />
              </div>
            )} */}

            <div className="relative">
              <MdOutlineAccountCircle
                size={34}
                className="font-thin hover:cursor-pointer"
                onMouseEnter={handleHoverEnter}
                onMouseLeave={handleHoverOut}
              />
              {isView && (
                <div className="bg-white rounded-md p-2 absolute shadow-md top-10 z-50 w-32 ">
                  <ul>
                    <Link href={`/myorders/${orderId}`}>
                      <li className="text-black flex gap-1 items-center font-medium hover:cursor-pointer hover:underline">
                        <FaShoppingCart />
                        My Orders
                      </li>
                    </Link>
                    {!isLogin ? (
                      <Link href={"auth/login"}>
                        <li
                          onClick={handleLogout}
                          className="text-black flex gap-1 items-center font-medium hover:cursor-pointer hover:underline"
                        >
                          <BiLogOutCircle />
                          Login
                        </li>
                      </Link>
                    ) : (
                      <li
                        onClick={handleLogout}
                        className="text-black flex gap-1 items-center font-medium hover:cursor-pointer hover:underline"
                      >
                        <BiLogOutCircle />
                        Logout
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            <Link href="/cart">
              <span className="relative group">
                <HiOutlineShoppingBag size={34} />
                <span className="text-white rounded-full px-1.5 bottom-4 left-5 bg-primary absolute text-[10px]">
                  {itemCount}
                </span>
              </span>
            </Link>
          </div>

          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
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
          className="items-center justify-between hidden w-full lg:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <ul className="flex flex-col text-black font-medium p-4 md:p-0 mt-4 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
            <li className="hover:underline hover:text-[#9896bc] transition-all duration-500 ease-in-out">
              <Link href="/">
                <span>Home</span>
              </Link>
            </li>

            <li>
              <div
                className="relative inline-block text-left"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link href={'/allproducts'}>
                  <button
                    className="text-black hover:text-primary transition-all duration-500 ease-in-out hover:underline font-medium rounded-lg text-center inline-flex items-center"
                    type="button"
                  >
                    All products
                  </button>
                </Link>
              </div>
            </li>

            <li className="hover:underline hover:text-[#9896bc] transition-all duration-500 ease-in-out">
              <Link href="/best-seller">
                <span>Best Sellers</span>
              </Link>
            </li>
            <li className="hover:underline hover:text-[#9896bc] transition-all duration-500 ease-in-out">
              <Link href="/mens">
                <span>Mens</span>
              </Link>
            </li>
            <li className="hover:underline hover:text-[#9896bc] transition-all duration-500 ease-in-out">
              <Link href="/womens">
                <span>Women's</span>
              </Link>
            </li>
            <li className="hover:underline hover:text-[#9896bc] transition-all duration-500 ease-in-out">
              <Link href="/kids">
                <span>Kids </span>
              </Link>
            </li>
            <li className="hover:underline hover:text-[#9896bc] transition-all duration-500 ease-in-out">
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
