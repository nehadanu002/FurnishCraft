
import React from "react";
import { Link, useParams } from "react-router";
import useProducts from "../Hooks/useProducts";
import Swal from "sweetalert2";
import { useCart } from "../Context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();

  const product = products.find(
    (p) => String(p.id) === String(id)
  );

  const stock = Number(product?.stock) || 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-600">
        Loading product details...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-700">
          Product Not Found
        </h2>

        <p className="text-sm text-gray-500 mt-2">
          The product you are looking for is unavailable.
        </p>

        <Link
          to="/product"
          className="mt-6 px-6 py-3 bg-[#3d6b4f] hover:bg-[#2d4f3c] text-white rounded-lg transition"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  // Add Product to Wishlist
  const handleWishlist = () => {
    try {
      const savedList = JSON.parse(
        localStorage.getItem("wishlist") || "[]"
      );

      const existingList = Array.isArray(savedList)
        ? savedList
        : [];

      const isDuplicate = existingList.some(
        (item) => String(item.id) === String(product.id)
      );

      if (isDuplicate) {
        Swal.fire({
          icon: "warning",
          title: "Already Added",
          text: "This product is already in your wishlist!",
          confirmButtonColor: "#3d6b4f",
        });
        return;
      }

      const updatedList = [...existingList, product];

      localStorage.setItem(
        "wishlist",
        JSON.stringify(updatedList)
      );

      Swal.fire({
        icon: "success",
        title: "Added Successfully!",
        text: "Product has been added to your wishlist.",
        confirmButtonColor: "#3d6b4f",
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Something Went Wrong",
        text: "Unable to update your wishlist. Please try again.",
        confirmButtonColor: "#3d6b4f",
      });
    }
  };

  // Add Product to Cart
  const handleAddToCart = () => {
    if (stock <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Out of Stock",
        text: "This product is currently unavailable.",
        confirmButtonColor: "#3d6b4f",
      });
      return;
    }

    addToCart(product);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 py-10 mt-10 md:mt-16">

      {/* Project Heading */}
      <h2 className="text-center text-sm md:text-base font-medium text-[#3d6b4f] mb-8">
        FurnishCraft: Modern Web Architecture for Online Furniture Retail
      </h2>

      <div className="grid md:grid-cols-2 gap-12 items-center">

        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
            className="rounded-2xl shadow-xl w-full h-80 md:h-[450px] max-w-md object-cover"
          />
        </div>

        {/* Product Information */}
        <div className="space-y-6">

          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              {product.name}
            </h1>

            <p className="text-sm mt-3 px-4 py-1 bg-[#f4f6f1] text-[#3d6b4f] rounded-full inline-block">
              {product.category}
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Price */}
          <p className="text-3xl font-bold text-[#3d6b4f]">
            ₹{Number(product.price).toLocaleString("en-IN")}
          </p>

          {/* Additional Information */}
          <div className="bg-[#f4f6f1] p-5 rounded-xl space-y-3">
            <p className="text-gray-700">
              <span className="font-semibold">Material:</span>{" "}
              {product.material || "Not specified"}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Dimensions:</span>{" "}
              {product.dimensions || "Not specified"}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Stock:</span>{" "}
              {stock > 0 ? (
                <span className="text-green-700 font-medium">
                  In Stock ({stock})
                </span>
              ) : (
                <span className="text-red-600 font-medium">
                  Out of Stock
                </span>
              )}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleAddToCart}
              disabled={stock <= 0}
              className="px-6 py-3 bg-[#3d6b4f] hover:bg-[#2d4f3c] disabled:bg-gray-400 text-white font-medium rounded-xl shadow-md transition duration-300"
            >
              Add to Cart
            </button>

            <button
              onClick={handleWishlist}
              className="px-6 py-3 bg-white border-2 border-[#3d6b4f] text-[#3d6b4f] hover:bg-[#f4f6f1] font-medium rounded-xl transition duration-300"
            >
              Add to Wishlist ♡
            </button>
          </div>

          <Link
            to="/product"
            className="inline-block text-[#3d6b4f] hover:underline font-medium"
          >
            ← Back to Products
          </Link>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
