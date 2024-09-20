'use client'

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../lib/firebase"; // Adjust path as needed

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage({ text: "Password reset email sent! Check your inbox.", type: "success" });
      setEmail(""); // Clear the email input
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setMessage({ text: "No user found with this email address. Please check and try again.", type: "error" });
      } else {
        setMessage({ text: "Failed to send password reset email. Please try again.", type: "error" });
      }
    }
  };

  return (
    <div className="min-h-[70vh] border-primary border-t border-b flex p-5 items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Forgot Password
        </h2>

        {/* Message */}
        {message.text && (
          <div
            className={`text-center mb-4 ${
              message.type === "error" ? "text-red-500" : "text-green-500"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-[#5b5c70] mt-4 font-bold hover:bg-primary text-white p-2 px-7 w-full hover:scale-95 transition-all duration-700 ease-in-out rounded-md"
          >
            Send Password Reset Email
          </button>
        </form>
      </div>
    </div>
  );
}
