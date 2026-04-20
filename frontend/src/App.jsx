import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Category from './pages/Category'
import Login from './pages/Login'
import ProductDetails from './pages/ProductDetails'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={2000} />
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product' element={<Category />} />
        <Route path='/login' element={<Login />} />
        <Route path='/product/:productid' element={<ProductDetails />} />
      </Routes>
      <Footer />


    </div>
  )
}

export default App