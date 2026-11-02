
import React from "react";

const WhyChooseUs = () => {
  const reasons = [
    {
      id: 1,
      icon: "✅",
      title: "Premium Quality",
      desc: "Explore furniture made with quality materials for durability and everyday comfort.",
    },
    {
      id: 2,
      icon: "🛡️",
      title: "Customer Satisfaction",
      desc: "We focus on providing a smooth and enjoyable furniture shopping experience.",
    },
    {
      id: 3,
      icon: "🚚",
      title: "Safe Delivery",
      desc: "Enjoy a convenient shopping experience with a focus on safe furniture delivery.",
    },
    {
      id: 4,
      icon: "✨",
      title: "Modern Designs",
      desc: "Discover stylish furniture that combines elegance, comfort, and functionality.",
    },
  ];

  return (
    <section className="bg-[#f4f6f1] py-16 mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          WHY CHOOSE{" "}
          <span className="text-[#3d6b4f]">FURNISHCRAFT?</span>
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
          At FurnishCraft, we bring together style, comfort, and
          functionality to help you create a beautiful living space.
          Here's why you should choose us:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason) => (
            <div
              key={reason.id}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg hover:-translate-y-1 transition duration-300"
            >
              <div className="flex justify-center mb-4 text-4xl">
                {reason.icon}
              </div>

              <h3 className="text-lg font-semibold text-[#3d6b4f] mb-2">
                {reason.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {reason.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
