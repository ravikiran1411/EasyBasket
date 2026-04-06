import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Order from './pages/Order'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'

export const backendUrl = import.meta.env.VITE_BACKEND_URL 

const App = () => {

  const [token,setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '' ) 

  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token]) 

  return ( 
    <div className=''>
      <ToastContainer />

      { token === '' ? <Login setToken={setToken} /> :  
      
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Add />}/>
          <Route path='/list' element={<List />} />
          <Route path='/orders' element={<Order/>} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>

      }

     
    </div>
  )
}

export default App