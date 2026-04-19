import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Navbar = ({setToken}) => {

  const handleLogout = () =>{

    setToken("")

  }

  return (
    <div className='w-full mt-5 '>
        <div className='mx-1 sm:mx-8 flex justify-between'>
            <div>
                <img src={assets.adminpanel_logo} className='w-25 h-15 sm:w-50 sm:h-40 ' />

            </div>

            <div className='flex sm:gap-15 pt-5 '>
              <NavLink to='/' className='flex gap-2 cursor-pointer'>
                <img src={assets.add_icon} className='w-5 h-5' /> 
                <p className='text-sm font-semibold'>ADD ITEMS</p>
              </NavLink>

              <NavLink to='/list' className='flex gap-2 cursor-pointer'>
                <img src={assets.order_icon} className='w-5 h-5 ' /> 
                <p className='text-sm font-semibold'>LIST ITEMS</p>
              </NavLink>
             
             <NavLink to='/orders' className='flex gap-2 cursor-pointer'>
                <img src={assets.order_icon} className='w-5 h-5 ' /> 
                <p className='text-sm font-semibold'>ORDERS</p>
              </NavLink>
             
            </div>
            <div className='pt-5 mr-5 -mt-3'>
              <button onClick={handleLogout} className='bg-green-300  font-semibold text-lg p-2 px-2 rounded-md'>LOGOUT</button>
            </div>

        </div>
    </div>
  )
}

export default Navbar