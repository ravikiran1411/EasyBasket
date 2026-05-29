import React from "react";
import { useNavigate } from "react-router-dom";

const VendorDashboard = () => {

  const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-8">
        Vendor Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

        <div
          onClick={() => navigate("/vendor/add-product")}
          className="bg-white p-6 rounded shadow cursor-pointer hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            Add Product
          </h2>

          <p className="text-gray-600">
            Add new grocery products
          </p>
        </div>

        <div
          onClick={() => navigate("/vendor/products")}
          className="bg-white p-6 rounded shadow cursor-pointer hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            My Products
          </h2>

          <p className="text-gray-600">
            Manage your products
          </p>
        </div>

        <div
          onClick={() => navigate("/vendor/store-settings")}
          className="bg-white p-6 rounded shadow cursor-pointer hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            Store Settings
          </h2>

          <p className="text-gray-600">
            Update your store details
          </p>
        </div>

      </div>

    </div>

  );

};

export default VendorDashboard;