import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import { DataContext } from "./context/DataContext";
import LocationUnavailable from "./components/LocationUnavailable";
import ScrollToTop from "./components/ScrollToTop";

const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Category = lazy(() => import("./pages/Category"));
const Cart = lazy(() => import("./pages/Cart"));
const PlaceOrder = lazy(() => import("./pages/PlaceOrder"));
const Orders = lazy(() => import("./pages/Orders"));
const Profile = lazy(() => import("./pages/Profile"));
const CreateStore = lazy(() => import("./pages/CreateStore"));
const VendorDashboard = lazy(() => import("./pages/VendorDashboard"));
const AddProduct = lazy(() => import("./pages/AddProduct"));
const MyProducts = lazy(() => import("./pages/MyProducts"));
const StoreSettings = lazy(() => import("./pages/StoreSettings"));
const EditProduct = lazy(() => import("./pages/EditProduct"));

const App = () => {
  const { loading, products } = useContext(DataContext);

  return (
    <div>
      {!loading && products.length == 0 ? (
        <LocationUnavailable />
      ) : (
        <div>
          <ScrollToTop/>
          <ToastContainer position="top-right" autoClose={1000} />
          <Navbar />
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-screen">
                <p className="animate-pulse text-lg">Loading...</p>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product" element={<Category />} />
              <Route path="/login" element={<Login />} />
              <Route path="/product/:productid" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/placeorder" element={<PlaceOrder />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/create-store" element={<CreateStore />} />
              <Route path="/vendor/dashboard" element={<VendorDashboard />} />
              <Route path="/vendor/add-product" element={<AddProduct />} />
              <Route path="/vendor/products" element={<MyProducts />} />
              <Route
                path="/vendor/store-settings"
                element={<StoreSettings />}
              />
              <Route
                path="/vendor/edit-product/:id"
                element={<EditProduct />}
              />
            </Routes>
          </Suspense>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default App;
