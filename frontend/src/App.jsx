import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'
import Footer from './components/Footer'
import {Suspense,lazy } from 'react'

const ProductDetails = lazy(()=>import("./pages/ProductDetails"))
const Category = lazy(()=>import("./pages/Category"))

const App = () => {

  return (
    <div>
      <ToastContainer position="top-right" autoClose={2000} /> 
      <Navbar/> 
 
      <Routes> 
        <Route path='/' element={<Home />} /> 
        <Route path='/product' element={<Suspense fallback={<div>Loading...</div>}><Category /></Suspense> } />
        <Route path='/login' element={<Login />} />
        <Route path='/product/:productid' element={<Suspense fallback={<div>Loading...</div>}> <ProductDetails /> </Suspense>} />
      </Routes>
      <Footer />


    </div>
  )
}

export default App