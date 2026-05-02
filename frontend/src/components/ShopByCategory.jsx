import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";

const categories = [
  { name: "Fruits", image: assets.categ1, value: "fruits" },
  { name: "Vegetables", image: assets.categ2 , value: "vegetables" },
  { name: "Snacks", image: assets.categ3 , value: "snacks" },
  { name: "Dairy", image:assets.categ6 , value: "dairyProducts" },
  { name: "Grains", image:assets.categ7 , value: "grains" },
  { name: "Packaged", image:assets.categ5 , value: "packagedFood" },
  { name: "Dry Fruits", image:assets.categ4 , value: "dryFruits" },
  { name: "Combo", image:assets.categ8 , value: "combo" },
];

const ShopByCategory = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 sm:px-10 lg:px-14 mt-10">

      {/* Heading */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="w-10 h-[2px] bg-green-600"></div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800" id="header">Shop by Category</h2>
        <div className="w-10 h-[2px] bg-green-600"></div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">

        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => navigate(`/product?category=${cat.value}`)}
            className="cursor-pointer group"
          >
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-3 flex flex-col items-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-3">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
              </div>
              <p className="text-sm font-medium text-gray-700 text-center">
                {cat.name}
              </p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default ShopByCategory;