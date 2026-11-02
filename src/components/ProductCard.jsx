
import React from "react";
import { Link } from "react-router";

const ProductCard = ({ item }) => {
  return (
    <div className="group bg-white border border-gray-100 shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition duration-300 p-4 flex flex-col">

      {/* Product Image */}
      <div className="w-full h-52 overflow-hidden rounded-xl bg-[#f4f6f1]">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name || "Furniture"}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            Image not available
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="flex-1 mt-4 space-y-2">
        <h2 className="text-lg font-bold text-gray-800 group-hover:text-[#3d6b4f] transition">
          {item.name}
        </h2>

        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>
            Category:{" "}
            <span className="text-[#3d6b4f] font-medium">
              {item.category}
            </span>
          </span>

          <span>Stock: {item.stock}</span>
        </div>

        <p className="text-sm text-gray-600">
          Material: {item.material}
        </p>

        <p className="text-sm text-gray-600">
          Dimensions: {item.dimensions}
        </p>
      </div>

      {/* Price and Button */}
      <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between items-center">
        <span className="text-xl font-bold text-[#3d6b4f]">
          ₹{item.price}
        </span>

        <Link
          to={`/product/${item.id}`}
          className="px-4 py-2 bg-[#3d6b4f] hover:bg-[#2d4f3c] text-white text-sm font-medium rounded-lg transition duration-300"
        >
          View Details
        </Link>
      </div>

    </div>
  );
};

export default ProductCard;
