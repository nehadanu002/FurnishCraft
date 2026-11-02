
import React from "react";

const Features = () => {
  const features = [
    {
      id: 1,
      icon: "🪑",
      title: "Wide Variety",
      desc: "Explore a wide collection of sofas, beds, tables, chairs, and other stylish furniture.",
    },
    {
      id: 2,
      icon: "🌿",
      title: "Elegant Designs",
      desc: "Discover beautiful furniture designs that bring elegance and comfort to your home.",
    },
    {
      id: 3,
      icon: "💰",
      title: "Affordable Pricing",
      desc: "Find stylish and functional furniture options at prices that suit your budget.",
    },
    {
      id: 4,
      icon: "🛠️",
      title: "Quality & Comfort",
      desc: "Choose furniture designed to offer everyday comfort, functionality, and durability.",
    },
  ];

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Why Choose <span className="text-[#3d6b4f]">FurnishCraft?</span>
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Discover furniture that combines style, comfort, and
          functionality to make your living spaces beautiful.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-[#f4f6f1] rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition duration-300"
            >
              <div className="flex justify-center mb-4 text-4xl">
                {feature.icon}
              </div>

              <h3 className="text-lg font-semibold text-[#3d6b4f] mb-2">
                {feature.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;
