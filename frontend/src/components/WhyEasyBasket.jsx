import React from "react";
import { assets } from "../assets/assets.js";

const features = [
  { icon: assets.delivery_icon, text: "Delivery in less than 30 minutes" },
  { icon: assets.fresh_icon, text: "Fresh fruits & veggies, picked daily" },
  { icon: assets.price_icon, text: "Affordable groceries, always" },
  { icon: assets.available_icon, text: "Always in stock" },
  { icon: assets.checkout_icon, text: "Shop anytime, anywhere" },
  { icon: assets.ontime_delivery_icon, text: "On-time delivery guaranteed" },
];

const WhyEasyBasket = () => {
  return (
    <div className="px-4 sm:px-10 lg:px-14 mt-14 bg-slate-50 py-6">
        <div className='text-black font-medium flex gap-2 items-center justify-center'>
            <span className='w-8 sm:w-12 h-0.5 bg-green-700'></span>            
            <p id='header' className='text-2xl sm:text-4xl text-center'>WHY EASYBASKET?</p>
            <span className='w-8 sm:w-12 h-0.5 bg-green-700'></span>            
        </div>

      <div className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar py-5">

        {features.map((item, index) => (
          <div
            key={index}
            className="min-w-[160px] sm:min-w-[200px] bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-center mb-3">
              <img className="w-16 sm:w-20" src={item.icon} alt="" />
            </div>

            <p className="text-xs sm:text-sm text-gray-600">
              {item.text}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
};

export default WhyEasyBasket;