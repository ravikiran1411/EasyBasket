import React from "react";

const ProductSkeleton = () => {
    
  return (
    <div className="min-w-[80%] md:min-w-0 animate-pulse">
      {/* Image */}
      <div className="w-full h-48 bg-gray-200 rounded-xl"></div>

      {/* Brand */}
      <div className="h-3 w-20 bg-gray-200 rounded mt-3"></div>

      {/* Product Name */}
      <div className="h-4 w-40 bg-gray-200 rounded mt-2"></div>

      {/* Quantity */}
      <div className="h-3 w-16 bg-gray-200 rounded mt-2"></div>

      {/* Price + Button */}
      <div className="flex items-center justify-between mt-4">
        <div className="h-5 w-16 bg-gray-200 rounded"></div>
        <div className="h-9 w-9 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;