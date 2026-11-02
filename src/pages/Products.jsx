
import React, { useState } from "react";
import useProducts from "../Hooks/useProducts";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

const Products = () => {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState("");

  const term = search.trim().toLowerCase();

  const searchProduct = term
    ? products.filter((product) =>
        product.name?.toLowerCase().includes(term)
      )
    : products;

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p className="text-center text-red-500 py-10">
        Error: {error.message}
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 py-10 mt-10 md:mt-20">

      {/* Project Heading */}
      <h1 className="text-2xl md:text-3xl font-bold text-[#3d6b4f] mb-4 text-center">
        FurnishCraft: Modern Web Architecture for Online Furniture Retail
      </h1>

      <p className="text-center text-gray-600 mb-10">
        Explore our collection of stylish and comfortable furniture.
      </p>

      {/* Search and Product Count */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-2 py-4 mb-4">

        <h2 className="text-xl font-semibold text-gray-700">
          All Products{" "}
          <span className="text-sm text-gray-400">
            ({searchProduct.length} Products)
          </span>
        </h2>

        <div className="flex items-center w-full sm:w-72 border border-gray-300 rounded-lg px-3 py-2 focus-within:border-[#3d6b4f]">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder="Search furniture..."
            className="w-full outline-none px-2 text-gray-700"
          />
        </div>
      </div>

      {/* Product Grid */}
      {searchProduct.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {searchProduct.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-16">
          No furniture found. Try searching for another product.
        </p>
      )}

    </div>
  );
};

export default Products;
