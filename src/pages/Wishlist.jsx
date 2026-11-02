
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");

  // Load Wishlist
  useEffect(() => {
    try {
      const savedList = JSON.parse(
        localStorage.getItem("wishlist") || "[]"
      );

      setWishlist(Array.isArray(savedList) ? savedList : []);
    } catch {
      setWishlist([]);
    }
  }, []);

  // Save Wishlist
  const updateWishlist = (updatedList) => {
    setWishlist(updatedList);
    localStorage.setItem("wishlist", JSON.stringify(updatedList));
  };

  // Sorting Logic
  const sortedWishlist = [...wishlist].sort((a, b) => {
    if (sortOrder === "low-to-high") {
      return Number(a.price) - Number(b.price);
    }

    if (sortOrder === "high-to-low") {
      return Number(b.price) - Number(a.price);
    }

    return 0;
  });

  // Remove Item from Wishlist
  const removeFromWishlist = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This item will be removed from your wishlist.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3d6b4f",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedList = wishlist.filter(
          (item) => item.id !== id
        );

        updateWishlist(updatedList);

        Swal.fire({
          title: "Removed!",
          text: "The item has been removed from your wishlist.",
          icon: "success",
          confirmButtonColor: "#3d6b4f",
        });
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 py-10 mt-20">

      {/* Page Heading */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#3d6b4f]">
            My Wishlist
          </h1>

          <p className="text-gray-500 mt-2">
            Your favourite furniture collection.
          </p>
        </div>

        {/* Sorting Dropdown */}
        {wishlist.length > 0 && (
          <div className="flex items-center gap-2">
            <label
              htmlFor="sort"
              className="text-gray-600 font-medium"
            >
              Sort by:
            </label>

            <select
              id="sort"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#3d6b4f]"
            >
              <option value="default">Default</option>
              <option value="low-to-high">
                Price: Low to High
              </option>
              <option value="high-to-low">
                Price: High to Low
              </option>
            </select>
          </div>
        )}
      </div>

      {/* Wishlist Content */}
      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="text-6xl mb-5 text-[#3d6b4f]">
            ♡
          </div>

          <h2 className="text-xl font-semibold text-gray-700">
            Your Wishlist is Empty
          </h2>

          <p className="text-gray-500 mt-2">
            Add your favourite furniture to see it here.
          </p>

          <Link
            to="/product"
            className="mt-6 px-6 py-3 bg-[#3d6b4f] hover:bg-[#2d4f3c] text-white rounded-lg transition"
          >
            Explore Furniture
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sortedWishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300 border border-gray-100"
            >
              {/* Product Image */}
              <div className="w-full h-52 bg-[#f4f6f1] flex items-center justify-center overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name || "Furniture"}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <p className="text-gray-500">
                    Image not available
                  </p>
                )}
              </div>

              {/* Product Details */}
              <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {item.name}
                </h2>

                <p className="text-sm text-gray-500 mb-3">
                  {item.category}
                </p>

                <p className="text-xl text-[#3d6b4f] font-bold">
                  ₹{Number(item.price).toLocaleString("en-IN")}
                </p>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="mt-5 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                  Remove from Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
