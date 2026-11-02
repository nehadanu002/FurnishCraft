
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { useUser } from "@clerk/clerk-react";

const Orders = () => {
  const { user, isLoaded } = useUser();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!isLoaded) return;

    try {
      const savedOrders = JSON.parse(
        localStorage.getItem("orders") || "[]"
      );

      if (Array.isArray(savedOrders) && user) {
        const userOrders = savedOrders.filter(
          (order) => order.userId === user.id
        );

        setOrders([...userOrders].reverse());
      } else {
        setOrders([]);
      }
    } catch {
      setOrders([]);
    }
  }, [user, isLoaded]);

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-600">
        Loading orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4 mt-10">
        <div className="text-6xl mb-4">🛒</div>

        <h1 className="text-2xl font-bold text-gray-800">
          No Orders Yet
        </h1>

        <p className="text-gray-500 mt-2">
          Your placed orders will appear here.
        </p>

        <Link
          to="/product"
          className="mt-6 px-6 py-3 bg-[#3d6b4f] text-white rounded-lg hover:bg-[#2d4f3c] transition"
        >
          Explore Furniture
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-10 mt-16">

      {/* Project Heading */}
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-[#3d6b4f]">
          My Orders
        </h1>

        <p className="text-gray-500 mt-2">
          FurnishCraft: Modern Web Architecture for Online Furniture Retail
        </p>

        <p className="text-sm text-gray-400 mt-1">
          Created by: Indrajeet Kumar
        </p>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white border border-gray-200 p-5 md:p-6 rounded-xl shadow-md"
          >
            {/* Order Header */}
            <div className="flex flex-col sm:flex-row justify-between gap-2 border-b pb-4 mb-4">
              <div>
                <h2 className="font-semibold text-gray-800">
                  Order ID: {order.id}
                </h2>

                {order.date && (
                  <p className="text-sm text-gray-500 mt-1">
                    Order Date:{" "}
                    {new Date(order.date).toLocaleDateString("en-IN")}
                  </p>
                )}
              </div>

              <span className="text-sm font-medium text-green-700 bg-green-50 px-3 py-1 rounded-full h-fit">
                {order.status || "Confirmed"}
              </span>
            </div>

            {/* Ordered Products */}
            <div className="space-y-3">
              {order.cart?.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex justify-between items-center gap-4"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {item.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <span className="font-medium text-gray-700">
                    ₹{(
                      Number(item.price) * Number(item.quantity)
                    ).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            {/* Order Total */}
            <div className="border-t mt-5 pt-4 flex justify-between items-center">
              <span className="font-semibold text-gray-800">
                Total Amount
              </span>

              <span className="text-xl font-bold text-[#3d6b4f]">
                ₹{Number(order.total || 0).toLocaleString("en-IN")}
              </span>
            </div>

            {/* Customer and Payment Details */}
            <div className="mt-4 bg-[#f4f6f1] p-4 rounded-lg space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-semibold text-gray-800">
                  Customer:
                </span>{" "}
                {order.customer?.name || "Not available"}
              </p>

              <p>
                <span className="font-semibold text-gray-800">
                  Payment Method:
                </span>{" "}
                {order.customer?.method || "Not available"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
