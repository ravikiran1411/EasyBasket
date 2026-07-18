import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";
import ProductList from "./ProductList";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";
import ProductSkeleton from "./ProductSkeleton";
const BestSeller = () => {
  const { products, loading } = useContext(DataContext);
  const [bestSeller, setBestSeller] = useState([]);

  console.log(loading);
  

  const fetch_BestSeller = () => {
    const product = products.filter((item) => item.bestSeller);
    setBestSeller(product.slice(0, 5));
  };

  useEffect(() => {
    fetch_BestSeller();
  }, [products]);


  if (loading) {
    return (
      <div className="mt-5 sm:mt-6 p-5 bg-slate-50 rounded-2xl">
        <div className="text-black font-medium flex gap-2 items-center justify-center">
          <span className="w-8 sm:w-12 h-0.5 bg-green-700"></span>
          <p className="text-2xl sm:text-4xl">BEST SELLER</p>
          <span className="w-8 sm:w-12 h-0.5 bg-green-700"></span>
        </div>

        <div className="flex overflow-x-auto gap-3 md:grid md:grid-cols-3 lg:grid-cols-5 pb-10 pt-7">
          {[...Array(5)].map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5 sm:mt-6 p-5 bg-slate-50 rounded-2xl">
      <div className="text-black font-medium flex gap-2 items-center justify-center">
        <span className="w-8 sm:w-12 h-0.5 bg-green-700"></span>

        <p id="header" className="text-2xl sm:text-4xl text-center">
          BEST SELLERS
        </p>
        <span className="w-8 sm:w-12 h-0.5 bg-green-700"></span>
      </div>

      <div className="flex overflow-x-auto gap-3 md:grid md:grid-cols-3 lg:grid-cols-5 pb-10 pt-7">
        {bestSeller.map((item, index) => (
          <div key={index} className="min-w-[80%] md:min-w-0">
            <ProductList
              image={item.image}
              id={item._id}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              brand={item.brand}
              bestSeller={item.bestSeller}
              category={item.category}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
