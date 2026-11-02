
import React from "react";
import { Link } from "react-router";

const Hero = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 mt-4 md:mt-10 lg:px-12 grid md:grid-cols-2 gap-12 items-center">

      {/* Left Content */}
      <div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Make Your Home Beautiful with{" "}
          <span className="text-[#3d6b4f]">FurnishCraft</span>
        </h1>

        <p className="mt-6 text-lg text-gray-600 leading-relaxed">
          Discover elegant furniture designed to bring comfort,
          beauty, and functionality into your everyday living.
          Find the perfect pieces to make your home feel special.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/product"
            className="px-6 py-3 bg-[#3d6b4f] hover:bg-[#2d4f3c] text-white rounded-xl shadow-lg transition"
          >
            Explore Furniture
          </Link>

          <Link
            to="/#furniture-collection"
            className="px-6 py-3 border border-[#3d6b4f] text-[#3d6b4f] hover:bg-green-50 rounded-xl transition"
          >
            View Collection
          </Link>
        </div>
      </div>

      {/* Right Image */}
      <div className="relative mr-0 md:mr-6">
        <img
          src="/images/hero-banner.jpg"
          alt="FurnishCraft Furniture Collection"
          className="rounded-3xl shadow-xl object-cover w-full h-[400px]"
        />

        <div className="absolute -top-6 -left-6 w-28 h-28 bg-green-100 rounded-full -z-10"></div>
        <div className="absolute -bottom-8 -right-8 w-36 h-36 bg-green-200 rounded-full -z-10"></div>
      </div>
    </div>
  );
};

export default Hero;
