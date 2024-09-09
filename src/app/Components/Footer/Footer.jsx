"use client";

import React from "react";
import Link from "next/link";
import { RiTwitterXLine } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white w-full flex items-center dark:bg-gray-900">
      <div className="mx-auto  w-full    max-w-screen-xl">
        <div className="grid grid-cols-1 py-6 lg:pl-7 md:justify-items-center  md:grid-cols-4">
          <div className="">
            <h2 className="mb-6 text-lg font-semibold text-gray-900 uppercase dark:text-white">
              Navigation
            </h2>
            <ul className="text-gray-500 text-sm dark:text-gray-400 font-medium">
              <li className="mb-2">
                <Link href="#" className="hover:underline">
                  About us
                </Link>
              </li>
              <li className="mb-2 flex md:flex-row flex-col md:items-center gap-1">
                <Link href="#" className=" hover:underline text-gray-500 ">
                  All Products
                </Link>
                <Link href="#" className=" hover:underline text-gray-300 ">
                  Products 1
                </Link>
                <Link href="#" className=" hover:underline text-gray-300 ">
                  Products 2
                </Link>
                <Link href="#" className=" hover:underline text-gray-300 ">
                  Products 3
                </Link>
                <Link href="#" className=" hover:underline text-gray-300 ">
                  Products 4
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:underline">
                  Best Sellers
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:underline">
                  Mens{" "}
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:underline">
                  Women's
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:underline">
                  Kids
                </Link>
              </li>
            </ul>
          </div>
          <div className="">
            <h2 className="mb-6 text-lg font-semibold text-gray-900 uppercase dark:text-white">
              Follow us
            </h2>
            <ul className="text-gray-500 flex flex-col gap-5  font-medium">
              <div className="flex items-center gap-3">
                <li className="mb-4 bg-primary w-fit p-2 rounded-full ">
                  <Link href="#" className="hover:underline ">
                    <RiTwitterXLine className="text-white" size={20} />
                  </Link>
                </li>
                <li className="mb-4 bg-primary w-fit  p-2 rounded-full">
                  <Link href="#" className="hover:underline">
                    <FaFacebook className="text-white" size={20} />
                  </Link>
                </li>
                <li className="mb-4 bg-primary w-fit  p-2 rounded-full">
                  <Link href="#" className="hover:underline">
                    <FaInstagram className="text-white" size={20} />
                  </Link>
                </li>
                <li className="mb-4 bg-primary w-fit  p-2 rounded-full">
                  <Link href="#" className="hover:underline">
                    <FaYoutube className="text-white" size={20} />
                  </Link>
                </li>
                <li className="mb-4 bg-primary w-fit  p-2 rounded-full">
                  <Link href="#" className="hover:underline">
                    <FaTiktok className="text-white" size={20} />
                  </Link>
                </li>
              </div>
              <li className="text-center font-light">
                <span>
                  Copyright © 2023 Rashid Shamloo <br /> All Rights Reserved
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h2 class="mb-6 text-lg font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
            <ul class="text-gray-500 text-sm dark:text-gray-400 font-medium">
                <li class="mb-4">
                    <a href="#" class="hover:underline">Privacy Policy</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="hover:underline">Licensing</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="hover:underline">Terms &amp; Conditions</a>
                </li>
            </ul>
        </div>
          <div className="">
            <h2 className="mb-6 text-lg  font-semibold text-gray-900 uppercase dark:text-white">
              Disclaimer
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <Link href="#" className="font-normal">
                  All products on this site are for demo <br /> purposes only.
                  The product images <br /> and information are copyrighted to{" "}
                  <br /> their respective owners.
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
