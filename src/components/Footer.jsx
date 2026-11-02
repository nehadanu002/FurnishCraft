
import React from "react";
import { Link } from "react-router";
import { Facebook, Instagram, Twitter, ArrowUp } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#f4f6f1] text-gray-700 mt-10">

      <div className="max-w-7xl mx-auto px-4 md:px-10 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-[#3d6b4f]">
            Furnish<span className="text-gray-900">Craft</span>
          </h2>

          <p className="mt-4 text-gray-600 text-sm leading-relaxed">
            Discover elegant and modern furniture designed to make
            your home beautiful, comfortable, and welcoming.
          </p>

          <p className="mt-4 text-sm text-gray-600">
            Developed by: <span className="font-semibold text-[#3d6b4f]">
              Indrajeet Kumar
            </span>
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Links
          </h3>

          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/" className="hover:text-[#3d6b4f] transition">
                Home
              </Link>
            </li>

            <li>
              <Link to="/product" className="hover:text-[#3d6b4f] transition">
                Furniture Collection
              </Link>
            </li>

            <li>
              <Link to="/wishlist" className="hover:text-[#3d6b4f] transition">
                Wishlist
              </Link>
            </li>

            <li>
              <Link to="/cart" className="hover:text-[#3d6b4f] transition">
                Shopping Cart
              </Link>
            </li>

            <li>
              <Link to="/orders" className="hover:text-[#3d6b4f] transition">
                My Orders
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact and Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Connect With Us
          </h3>

          <p className="text-sm text-gray-600 leading-relaxed">
            Have questions about our furniture or your orders?
            We are here to help you.
          </p>

          <div className="flex gap-4 mt-5">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="text-[#3d6b4f] hover:text-[#2d4f3c] transition"
            >
              <Facebook size={22} />
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-[#3d6b4f] hover:text-[#2d4f3c] transition"
            >
              <Instagram size={22} />
            </a>

            <a
              href="https://www.twitter.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="text-[#3d6b4f] hover:text-[#2d4f3c] transition"
            >
              <Twitter size={22} />
            </a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-gray-300 py-5 px-4 flex flex-col sm:flex-row justify-between items-center gap-3 max-w-7xl mx-auto text-sm text-gray-600">
        <p>
          © {new Date().getFullYear()} FurnishCraft. All rights reserved.
        </p>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 text-[#3d6b4f] hover:text-[#2d4f3c] font-medium transition"
        >
          Back to Top <ArrowUp size={16} />
        </button>
      </div>

    </footer>
  );
};

export default Footer;
