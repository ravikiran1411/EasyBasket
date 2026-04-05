import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    id: 1,
    type: "left",
    title: "Fresh Vegetables 🥦",
    desc: "Farm fresh veggies at best price",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e",
    bg: "bg-green-100"
  },
  {
    id: 2,
    type: "center",
    title: "50% OFF Sale 🛒",
    desc: "Big discounts on groceries",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc"
  },
  {
    id: 3,
    type: "right",
    title: "Healthy Fruits 🍎",
    desc: "Fresh fruits directly from farms",
    image: "https://images.unsplash.com/photo-1574226516831-e1dff420e43e",
    bg: "bg-yellow-100"
  }
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((current + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  return (
    <div className="relative w-full h-[300px] sm:h-[500px] overflow-hidden">

      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute w-full h-full transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >

          {/* 🔹 LEFT LAYOUT */}
          {slide.type === "left" && (
            <div className={`flex h-full ${slide.bg}`}>
              <div className="w-1/2 flex flex-col justify-center p-6 sm:p-12">
                <h1 className="text-2xl sm:text-4xl font-bold">{slide.title}</h1>
                <p className="mt-2 text-gray-600">{slide.desc}</p>
                <button
                  onClick={() => navigate("/products")}
                  className="mt-4 bg-green-600 text-white px-6 py-2 rounded-full"
                >
                  Shop Now
                </button>
              </div>
              <img src={slide.image} className="w-1/2 object-cover" />
            </div>
          )}

          {/* 🔹 CENTER LAYOUT */}
          {slide.type === "center" && (
            <div className="relative w-full h-full">
              <img src={slide.image} className="w-full h-full object-cover" />

              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center">
                <h1 className="text-2xl sm:text-4xl font-bold">{slide.title}</h1>
                <p className="mt-2">{slide.desc}</p>
                <button
                  onClick={() => navigate("/products")}
                  className="mt-4 bg-green-500 px-6 py-2 rounded-full"
                >
                  Shop Now
                </button>
              </div>
            </div>
          )}

          {/* 🔹 RIGHT LAYOUT */}
          {slide.type === "right" && (
            <div className={`flex h-full ${slide.bg}`}>
              <img src={slide.image} className="w-1/2 object-cover" />
              <div className="w-1/2 flex flex-col justify-center p-6 sm:p-12">
                <h1 className="text-2xl sm:text-4xl font-bold">{slide.title}</h1>
                <p className="mt-2 text-gray-600">{slide.desc}</p>
                <button
                  onClick={() => navigate("/products")}
                  className="mt-4 bg-green-600 text-white px-6 py-2 rounded-full"
                >
                  Shop Now
                </button>
              </div>
            </div>
          )}

        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 px-3 py-1 rounded-full"
      >
        ❮
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 px-3 py-1 rounded-full"
      >
        ❯
      </button>

      {/* 🔘 Dots */}
      <div className="absolute bottom-3 w-full flex justify-center gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              current === i ? "bg-green-500" : "bg-white"
            }`}
          />
        ))}
      </div>

    </div>
  );
};

export default HeroSection;