
import React from "react";
import { useCart } from "../Context/CartContext";
import { useNavigate, Link } from "react-router";
import Swal from "sweetalert2";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
  } = useCart();

  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (acc, item) =>
      acc + Number(item.price) * Number(item.quantity),
    0
  );

  // Remove Product from Cart
  const handleRemove = (id) => {
    Swal.fire({
      title: "Remove Product?",
      text: "This item will be removed from your cart.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3d6b4f",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(id);
      }
    });
  };

  // Empty Cart
  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4 mt-10">
        <div className="text-6xl mb-4">🛒</div>

        <h1 className="text-2xl font-bold text-gray-800">
          Your Cart is Empty
        </h1>

        <p className="text-gray-500 mt-2">
          Explore our collection and add your favourite furniture.
        </p>

        <Link
          to="/product"
          className="mt-6 px-6 py-3 bg-[#3d6b4f] hover:bg-[#2d4f3c] text-white rounded-lg transition"
        >
          Explore Furniture
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-10 mt-16">

      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-[#3d6b4f] mb-2">
        Your Shopping Cart
      </h1>

      <p className="text-gray-500 mb-8">
        Review your selected furniture before checkout.
      </p>

      {/* Cart Items */}
      <div className="space-y-4">
        {cart.map((item) => {
          const stock = Number(item.stock) || 0;
          const quantity = Number(item.quantity) || 1;
          const subtotal = Number(item.price) * quantity;

          return (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center justify-between gap-5 p-4 bg-white border border-gray-100 shadow-md rounded-xl"
            >
              {/* Product Information */}
              <div className="flex items-center gap-4 w-full sm:w-2/5">
                <img
                  src={item.image}
                  alt={item.name || "Furniture"}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  className="w-20 h-20 object-cover rounded-lg bg-[#f4f6f1]"
                />

                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h2>

                  <p className="text-[#3d6b4f] font-medium">
                    ₹{Number(item.price).toLocaleString("en-IN")}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Subtotal: ₹{subtotal.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-4 bg-[#f4f6f1] px-4 py-2 rounded-full">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    disabled={quantity <= 1}
                    className="w-8 h-8 flex items-center justify-center bg-[#3d6b4f] text-white rounded-full hover:bg-[#2d4f3c] disabled:opacity-40 transition"
                    aria-label={`Decrease ${item.name} quantity`}
                  >
                    -
                  </button>

                  <span className="text-lg font-semibold text-gray-800 w-8 text-center">
                    {quantity}
                  </span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    disabled={quantity >= stock}
                    className="w-8 h-8 flex items-center justify-center bg-[#3d6b4f] text-white rounded-full hover:bg-[#2d4f3c] disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                    aria-label={`Increase ${item.name} quantity`}
                  >
                    +
                  </button>
                </div>

                <span className="text-xs text-gray-500">
                  Available stock: {stock}
                </span>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemove(item.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>

      {/* Cart Summary */}
      <div className="mt-10 bg-[#f4f6f1] p-6 rounded-xl shadow-sm flex flex-col md:flex-row justify-between items-center gap-5">
        <div>
          <p className="text-gray-600">
            Total Amount
          </p>

          <h2 className="text-2xl font-bold text-[#3d6b4f]">
            ₹{totalPrice.toLocaleString("en-IN")}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {cart.reduce(
              (total, item) => total + Number(item.quantity),
              0
            )}{" "}
            item(s) in your cart
          </p>
        </div>

        <button
          onClick={() => navigate("/payment")}
          className="px-6 py-3 bg-[#3d6b4f] text-white font-semibold rounded-lg hover:bg-[#2d4f3c] transition"
        >
          Proceed to Checkout
        </button>
      </div>

    </div>
  );
};

export default Cart;
