
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router";
import { CheckCircle } from "lucide-react";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const savedOrder = location.state?.order;

    if (
      savedOrder &&
      Array.isArray(savedOrder.cart) &&
      savedOrder.customer
    ) {
      setOrder(savedOrder);
    } else {
      navigate("/", { replace: true });
    }
  }, [location.state, navigate]);

  if (!order) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-10 mt-16">

      {/* Success Message */}
      <div className="text-center mb-10">
        <div className="flex justify-center mb-5">
          <CheckCircle
            size={75}
            className="text-[#3d6b4f]"
            strokeWidth={1.5}
          />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-[#3d6b4f] mb-3">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-600">
          Thank you for shopping with FurnishCraft.
          Your order has been confirmed.
        </p>

        <p className="text-sm text-gray-500 mt-3">
          Order ID: {order.id}
        </p>

        {order.date && (
          <p className="text-sm text-gray-500 mt-1">
            Order Date:{" "}
            {new Date(order.date).toLocaleDateString("en-IN")}
          </p>
        )}

        <span className="inline-block mt-4 px-4 py-2 rounded-full bg-green-50 text-green-700 text-sm font-semibold">
          {order.status || "Confirmed"}
        </span>
      </div>

      {/* Order Summary */}
      <div className="bg-[#f4f6f1] p-6 rounded-xl mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-5">
          Order Summary
        </h2>

        <div className="space-y-4">
          {order.cart.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm"
            >
              <div>
                <h3 className="font-semibold text-gray-800">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>

              <span className="font-semibold text-[#3d6b4f]">
                ₹{(
                  Number(item.price) * Number(item.quantity)
                ).toLocaleString("en-IN")}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-300 mt-6 pt-5 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">
            Total Amount
          </h2>

          <span className="text-2xl font-bold text-[#3d6b4f]">
            ₹{Number(order.total || 0).toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* Customer Information */}
      <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Customer Information
        </h2>

        <div className="space-y-3 text-gray-600 break-words">
          <p>
            <span className="font-semibold text-gray-800">
              Name:
            </span>{" "}
            {order.customer.name}
          </p>

          <p>
            <span className="font-semibold text-gray-800">
              Email:
            </span>{" "}
            {order.customer.email}
          </p>

          <p>
            <span className="font-semibold text-gray-800">
              Address:
            </span>{" "}
            {order.customer.address}
          </p>

          <p>
            <span className="font-semibold text-gray-800">
              Payment Method:
            </span>{" "}
            {order.customer.method}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
        <Link
          to="/orders"
          className="px-6 py-3 text-center bg-[#3d6b4f] text-white rounded-lg hover:bg-[#2d4f3c] transition"
        >
          View My Orders
        </Link>

        <Link
          to="/product"
          className="px-6 py-3 text-center border border-[#3d6b4f] text-[#3d6b4f] rounded-lg hover:bg-[#f4f6f1] transition"
        >
          Continue Shopping
        </Link>
      </div>

    </div>
  );
};

export default OrderSuccess;
