
import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { useCart } from "../Context/CartContext";
import {
  useUser,
  SignInButton,
  SignOutButton,
} from "@clerk/clerk-react";
import { ShoppingCart, Menu, X } from "lucide-react";

const Navbar = () => {
  const { cartCount } = useCart();
  const { user, isLoaded } = useUser();

  const [openProfile, setOpenProfile] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive
      ? "bg-[#3d6b4f] text-white font-semibold px-4 py-2 rounded-lg"
      : "text-gray-700 hover:text-[#3d6b4f] hover:bg-green-50 px-4 py-2 rounded-lg transition";

  const closeMenus = () => {
    setOpenMobile(false);
    setOpenProfile(false);
  };

  const links = (
    <>
      <NavLink to="/" end className={linkClass} onClick={closeMenus}>
        Home
      </NavLink>

      <NavLink to="/product" className={linkClass} onClick={closeMenus}>
        Furniture
      </NavLink>

      <NavLink to="/wishlist" className={linkClass} onClick={closeMenus}>
        Wishlist
      </NavLink>
    </>
  );

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="h-20 flex items-center justify-between">

            {/* Logo */}
            <Link
              to="/"
              onClick={closeMenus}
              className="text-2xl font-bold text-[#3d6b4f]"
            >
              Furnish<span className="text-gray-900">Craft</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-3">
              {links}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-4">

              {/* Cart */}
              <Link
                to="/cart"
                onClick={closeMenus}
                aria-label={`Shopping cart with ${cartCount} items`}
                className="relative text-[#3d6b4f] hover:text-[#2d4f3c] transition"
              >
                <ShoppingCart size={25} />

                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold min-w-5 h-5 px-1 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Authentication */}
              {isLoaded && (
                user ? (
                  <div className="relative">
                    <button
                      onClick={() => setOpenProfile(!openProfile)}
                      aria-label="Open profile menu"
                      aria-expanded={openProfile}
                      className="rounded-full"
                    >
                      <img
                        src={user.imageUrl}
                        alt="Profile"
                        className="w-10 h-10 rounded-full cursor-pointer border-2 border-[#3d6b4f]"
                      />
                    </button>

                    {openProfile && (
                      <div className="absolute right-0 mt-3 w-52 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
                        <div className="px-4 py-3 border-b">
                          <p className="font-semibold text-gray-800">
                            {user.firstName || "User"}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user.primaryEmailAddress?.emailAddress}
                          </p>
                        </div>

                        <Link
                          to="/orders"
                          onClick={closeMenus}
                          className="block px-4 py-3 text-gray-700 hover:bg-green-50 transition"
                        >
                          My Orders
                        </Link>

                        <SignOutButton>
                          <button
                            onClick={closeMenus}
                            className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition"
                          >
                            Logout
                          </button>
                        </SignOutButton>
                      </div>
                    )}
                  </div>
                ) : (
                  <SignInButton>
                    <button className="px-5 py-2 bg-[#3d6b4f] hover:bg-[#2d4f3c] text-white rounded-lg transition">
                      Login
                    </button>
                  </SignInButton>
                )
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setOpenMobile(!openMobile)}
                className="lg:hidden text-[#3d6b4f]"
                aria-label="Toggle navigation"
                aria-expanded={openMobile}
              >
                {openMobile ? <X size={27} /> : <Menu size={27} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {openMobile && (
            <nav className="lg:hidden flex flex-col gap-2 pb-4 border-t pt-3">
              {links}
            </nav>
          )}
        </div>
      </header>

      {/* Space for Fixed Navbar */}
      <div className="h-20"></div>
    </>
  );
};

export default Navbar;
