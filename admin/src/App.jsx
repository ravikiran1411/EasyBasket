import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Order from './pages/Order'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'

export const backendUrl = import.meta.env.VITE_BACKEND_URL 
export const currency = "₹"
const App = () => {

  const [token,setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '' ) 

  useEffect(() => {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
}, [token]);

  return ( 
    <div className=''>
      <ToastContainer />

      { token === '' ? <Login setToken={setToken} /> :  
      
      <div>
        <Navbar setToken={setToken} />
        <Routes>
          <Route path='/' element={<Add token={token} />}/>
          <Route path='/list' element={<List token={token} />} />
          <Route path='/orders' element={<Order token={token} />} />
        </Routes>
      </div>
      }
     
    </div>
  )
}

export default App