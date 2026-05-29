import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const Navbar = ({ setToken }) => {
  const handleLogout = () => {
    setToken("");
  };

  return (

    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
         <div className="flex items-center justify-between h-16">
          <img
          src={assets.adminpanel_logo}
          alt=""
          className="w-35 mt-10 sm:mt-15 sm:w-70 object-contain"
          />

          <div className="hidden md:flex items-center gap-8">

          <NavLink
            to="/list"
            className={({ isActive }) => `${isActive ? "text-green-600" : "text-gray-600"}font-medium hover:text-green-600 transition`}
          >
          List Items
          </NavLink>

          <NavLink
            to="/orders"
            className={({ isActive }) =>`${isActive ? "text-green-600" : "text-gray-600"}font-medium hover:text-green-600 transition`}
          >
          Orders
          </NavLink>

          <button onClick={handleLogout} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
          Logout
          </button>

      </div>

      <button
        onClick={handleLogout}
        className="md:hidden bg-green-500 text-white px-3 py-2 rounded-md text-sm"
      >
        Logout
      </button>

    </div>

    <div className="md:hidden flex border-t">

      <NavLink
        to="/list"
        className={({ isActive }) =>
          `flex-1 text-center py-3 font-medium ${
            isActive
              ? "text-green-600 border-b-2 border-green-600"
              : "text-gray-500"
          }`
        }
      >
        Products
      </NavLink>

      <NavLink
        to="/orders"
        className={({ isActive }) =>
          `flex-1 text-center py-3 font-medium ${
            isActive
              ? "text-green-600 border-b-2 border-green-600"
              : "text-gray-500"
          }`
        }
      >
        Orders
      </NavLink>

    </div>

  </div>

</div>

  );
};

export default Navbar;