"use client";
import Link from "next/link";
import { FaSignInAlt } from "react-icons/fa"; // Import the login icon

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center p-4 ">
      <h2 className="text-3xl font-bold mb-6 text-center ">Please Login</h2>
      <p className="text-lg mb-4 text-center">
        You need to be logged in to access this page.
      </p>
      <Link href="/auth/login">
        <button className="flex items-center bg-[#5b5c70] w-full sm:w-fit font-bold hover:bg-primary mt-4 text-white p-3 px-7 hover:scale-95 transition-all duration-700 ease-in-out rounded-md">
          <FaSignInAlt className="mr-2" size={20} />
          Go to Login Page
        </button>
      </Link>
    </div>
  );
}
