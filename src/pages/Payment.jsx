
import React, { useState } from "react";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import Swal from "sweetalert2";

const Payment = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user, isLoaded } = useUser();

  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-600">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Login Required
        </h2>
        <p className="text-gray-500 mt-2">
          Please log in to continue with your order.
        </p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Your Cart is Empty
        </h2>
        <p className="text-gray-500 mt-2">
          Add some furniture before proceeding to checkout.
        </p>
        <button
          onClick={() => navigate("/product")}
          className="mt-5 px-6 py-3 bg-[#3d6b4f] text-white rounded-lg hover:bg-[#2d4f3c] transition"
        >
          Explore Furniture
        </button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    // Validate product stock
    const unavailableItem = cart.find(
      (item) =>
        Number(item.quantity) > Number(item.stock) ||
        Number(item.stock) <= 0
    );

    if (unavailableItem) {
      Swal.fire({
        icon: "warning",
        title: "Stock Unavailable",
        text: `${unavailableItem.name} does not have enough available stock.`,
        confirmButtonColor: "#3d6b4f",
      });
      return;
    }

    const orderData = {
      id: Date.now(),
      cart: [...cart],
      total: cartTotal,
      customer: {
        name: form.elements.name.value.trim(),
        email: form.elements.email.value.trim(),
        address: form.elements.address.value.trim(),
        method: form.elements.method.value,
      },
      userId: user.id,
      date: new Date().toISOString(),
      status: "Confirmed",
    };

    try {
      const existingOrders = JSON.parse(
        localStorage.getItem("orders") || "[]"
      );

      if (!Array.isArray(existingOrders)) {
        throw new Error("Invalid order data");
      }

      localStorage.setItem(
        "orders",
        JSON.stringify([...existingOrders, orderData])
      );

      clearCart();

      navigate("/order-success", {
        state: { order: orderData },
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Order Failed",
        text: "Unable to save your order. Please try again.",
        confirmButtonColor: "#3d6b4f",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-10 mt-16">

      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-[#3d6b4f] mb-2">
        Checkout
      </h1>

      <p className="text-gray-500 mb-8">
        FurnishCraft: Modern Web Architecture for Online Furniture Retail
      </p>

      {/* Order Summary */}
      <div className="bg-[#f4f6f1] p-6 rounded-xl mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-5">
          Order Summary
        </h2>

        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center gap-4 border-b border-gray-200 pb-3"
            >
              <div>
                <p className="font-medium text-gray-800">
                  {item.name}
                </p>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>

              <span className="font-semibold text-gray-700">
                ₹{(
                  Number(item.price) * Number(item.quantity)
                ).toLocaleString("en-IN")}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6">
          <h2 className="text-xl font-bold text-gray-800">
            Total Amount
          </h2>

          <span className="text-2xl font-bold text-[#3d6b4f]">
            ₹{Number(cartTotal).toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* Checkout Button */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full bg-[#3d6b4f] text-white py-3 rounded-lg hover:bg-[#2d4f3c] transition font-semibold"
        >
          Continue to Checkout
        </button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 p-6 rounded-xl shadow-md space-y-5"
        >
          <h2 className="text-2xl font-semibold text-gray-800">
            Customer and Payment Details
          </h2>

          {/* Customer Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={user.fullName || ""}
              placeholder="Enter your full name"
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-[#3d6b4f]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              defaultValue={
                user.primaryEmailAddress?.emailAddress || ""
              }
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-[#3d6b4f]"
            />
          </div>

          {/* Shipping Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shipping Address
            </label>
            <textarea
              name="address"
              placeholder="Enter your complete delivery address"
              required
              rows="3"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-[#3d6b4f]"
            />
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>

            <select
              name="method"
              required
              defaultValue=""
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-[#3d6b4f]"
            >
              <option value="" disabled>
                Select Payment Method
              </option>
              <option value="UPI">UPI</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Cash on Delivery">
                Cash on Delivery
              </option>
            </select>
          </div>

          <p className="text-sm text-gray-500">
            Note: This is a demonstration checkout. No actual online
            payment will be processed.
          </p>

          {/* Place Order */}
          <button
            type="submit"
            className="w-full bg-[#3d6b4f] text-white py-3 rounded-lg hover:bg-[#2d4f3c] transition font-semibold"
          >
            Place Order
          </button>
        </form>
      )}
    </div>
  );
};

export default Payment;
