import React from 'react'
import { Routes, Route } from 'react-router-dom'
import {Suspense,lazy } from 'react'

import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'
import Footer from './components/Footer'

const ProductDetails = lazy(()=>import("./pages/ProductDetails"))
const Category = lazy(()=>import("./pages/Category"))
const Cart = lazy(()=>import("./pages/Cart"))
const PlaceOrder = lazy(()=>import("./pages/PlaceOrder"))
const Orders = lazy(()=>import("./pages/Orders"))
const Profile = lazy(()=>import("./pages/Profile"))


const App = () => {

  return (
    <div>
      <ToastContainer position="top-right" autoClose={2000} /> 
      <Navbar/> 

      <Suspense 
      fallback={
      <div className="flex justify-center items-center h-screen">
        <p className="animate-pulse text-lg">Loading...</p>
      </div>
      }>
        <Routes>
          <Route path='/' element={<Home />} /> 
          <Route path='/product' element={<Category />} />
          <Route path='/login' element={<Login />} />
          <Route path='/product/:productid' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/placeorder' element={<PlaceOrder />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/profile' element={<Profile />} />

        </Routes>
      </Suspense>
      <Footer />


    </div>
  )
}

export default App