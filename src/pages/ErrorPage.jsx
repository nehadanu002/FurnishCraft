
import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f4f6f1] px-6 py-12 text-center">
      <h1 className="text-7xl md:text-9xl font-extrabold text-[#3d6b4f]">
        404
      </h1>

      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-4">
        Page Not Found
      </h2>

      <div className="h-1 w-24 bg-[#3d6b4f] rounded-full my-7"></div>

      <p className="text-gray-600 max-w-md text-base md:text-lg leading-relaxed">
        Oops! The page you are looking for does not exist or may
        have been moved. Please check the URL or return to the
        FurnishCraft homepage.
      </p>

      <Link
        to="/"
        className="flex items-center gap-2 bg-[#3d6b4f] hover:bg-[#2d4f3c] text-white px-7 py-3 rounded-lg mt-9 font-semibold shadow-md transition duration-300"
      >
        Back to Home

        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
};

export default ErrorPage;
