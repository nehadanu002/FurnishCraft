
import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Alice",
    role: "Happy Customer",
    message:
      "I purchased a sofa from FurnishCraft. The quality is excellent and offers great value for money.",
    image: "https://avatars.githubusercontent.com/u/195456266?v=4",
  },
  {
    id: 2,
    name: "Bob",
    role: "Interior Designer",
    message:
      "I always recommend FurnishCraft to my clients. The furniture designs and durability are impressive.",
    image: "https://avatars.githubusercontent.com/u/92626624?v=4",
  },
  {
    id: 3,
    name: "Casey",
    role: "Businessman",
    message:
      "The delivery was very fast, and I am extremely satisfied with the service. I plan to shop here again.",
    image: "https://avatars.githubusercontent.com/u/78620963?v=4",
  },
];

const Testimonial = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Why Customers Love{" "}
          <span className="text-[#3d6b4f]">FurnishCraft</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-[#f4f6f1] shadow-md rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-14 h-14 rounded-full border-2 border-[#3d6b4f] object-cover"
                />

                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {t.name}
                  </h3>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>

              <p className="text-gray-600 italic leading-relaxed">
                “{t.message}”
              </p>

              <div className="mt-4 text-yellow-500">★★★★★</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
