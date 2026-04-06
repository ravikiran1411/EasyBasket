import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Category from './pages/Category'
import Login from './pages/Login'
import ProductDetails from './pages/ProductDetails'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'
const App = () => {
  return (
    <div>
      <ToastContainer/>

      <Navbar />
      
      <Routes> 
        <Route path='/' element={<Home />}  />
        <Route path='/category' element={<Category />} />
        <Route path='/login' element={<Login />} /> 
        <Route path='/product' element={<Category />} /> 
        <Route path='/product/:productid' element={<ProductDetails />} />
      </Routes>
      
    </div>
  )
}

export default App