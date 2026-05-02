import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {

  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      title: "Fresh Groceries Delivered ",
      desc: "Get fresh fruits & vegetables at your doorstep",
      image: assets.hero1_image
    },
    {
      title: "Combo Offers ",
      desc: "Save more with our special combo packs",
      image: assets.hero2_image
    },
    {
      title: "All Groceries Available ",
      desc: "Everything you need in one place",
      image: assets.hero3_
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[30vh] md:h-[45vh] overflow-hidden rounded-md">

      {slides.map((slide, index) => (

        <div
          key={index}
          className={`absolute w-full h-full transition-all duration-700 ${
            index === current ? "opacity-100 z-10" : "opacity-0"
          }`}
        >
          

          {index === 0 && (
            <div className="w-full h-full flex flex-col md:flex-row items-center justify-center md:justify-between px-4 md:px-12 bg-gradient-to-r from-green-100 to-green-200 text-center md:text-left">

              <div className="max-w-md md:max-w-lg">
                <h1 className="text-xl md:text-5xl font-bold text-gray-800">
                  {slide.title}
                </h1>

                <p className="mt-2 text-gray-600 text-xs md:text-base">
                  {slide.desc}
                </p>

                

                <button onClick={()=>navigate('/product')} className="mt-3 md:mt-5 bg-green-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-md">
                  Shop Now
                </button>
              </div>

              <div className="mt-3 md:mt-0">
                <img 
                  src={slide.image} 
                  className="w-[200px] md:w-[500px] lg:w-[600px]" 
                />
              </div>

            </div>
          )}


          {index === 1 && (
            <div className="relative w-full h-full">

              <img 
                src={slide.image} 
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/40"></div>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-3">
                <h1 className="text-xl md:text-5xl font-bold">
                  {slide.title}
                </h1>

                <p className="mt-2 text-xs md:text-base">
                  {slide.desc}
                </p>

                <button onClick={()=>navigate('/product?category=combo')} className="mt-3 md:mt-5 bg-green-600 px-4 py-2 md:px-6 md:py-3 rounded-md">
                  Explore Combos
                </button>
              </div>

            </div>
          )}


          {index === 2 && (
            <div className="w-full h-full flex flex-col md:flex-row items-center justify-center md:justify-between px-4 md:px-12 bg-gradient-to-r from-blue-100 to-purple-100 text-center md:text-left">

              <div className="max-w-md md:max-w-lg">
                <h1 className="text-xl md:text-5xl font-bold text-gray-800">
                  {slide.title}
                </h1>

                <p className="mt-2 text-gray-600 text-xs md:text-base">
                  {slide.desc}
                </p>

                <button onClick={()=>navigate('/product')} className="mt-3 md:mt-5 bg-green-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-md">
                  Shop Now
                </button>
              </div>

              <div className="mt-3 md:mt-0">
                <img 
                  src={slide.image} 
                  className="w-[200px] md:w-[450px] lg:w-[550px]" 
                />
              </div>

            </div>
          )}

        </div>
      ))}

      <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full cursor-pointer ${
              i === current ? "bg-green-600" : "bg-gray-400"
            }`}
            onClick={() => setCurrent(i)}
          ></div>
        ))}
      </div>

    </div>
  );
};

export default HeroSection;