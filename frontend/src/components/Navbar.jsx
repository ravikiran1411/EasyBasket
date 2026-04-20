import React, { useState, useContext, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets.js'
import { DataContext } from '../context/DataContext.jsx'

const Navbar = () => {
  const [visible, setvisible] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const { token, setToken } = useContext(DataContext)
  const [login, setLogin] = useState("Login")
  const navigate = useNavigate()

  const loginSet = () => {
    if (token) {
      setLogin('Logout')
    } else {
      setLogin('Login')
    }
  }

  const handleLogin = () => {
    if (token) {
      setToken("")
      localStorage.removeItem("token")
      navigate('/login')
      // toast.success("Logged out") // optional
    } else {
      navigate('/login')
    }
  }

  useEffect(() => {
    loginSet()
  }, [token])

  return (
    <div className="bg-white shadow-sm sticky top-0 z-50">

      {/* Top Navbar */}
      <div className="flex justify-between items-center gap-3 sm:gap-5 px-4 sm:px-10 py-3">

        <div className="flex items-center justify-between gap-2 sm:gap-17">
          <Link to="/" className="text-md sm:text-2xl font-bold text-green-700">
            EasyBasket
          </Link>
          <div className='flex items-center gap-1 text-xs sm:text-sm cursor-pointer'>
            <img src={assets.map_icon} className='w-4 h-4' alt="" />
            <p className="hidden sm:block">Hyderabad</p>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 mx-2 sm:mx-4 relative flex justify-end">
          <input
            type="text"
            placeholder="Search groceries..."
            className="hidden sm:block w-170 px-4 py-2 pr-10 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-green-400"
          />

          {showSearch && (
            <input
              type="text"
              placeholder="Search..."
              className="absolute top-12 left-0 w-full px-4 py-2 border rounded outline-none sm:hidden bg-white shadow"
            />
          )}

          <img
            onClick={() => setShowSearch(!showSearch)}
            src={assets.search_icon}
            className="w-5 sm:absolute sm:right-3 sm:top-1/2 sm:-translate-y-1/2 opacity-60 cursor-pointer"
            alt=""
          />
        </div>

        {/* UPDATED SECTION 🔥 */}
        <div className='hidden md:flex items-center gap-3 mx-5'>
          <NavLink to="/product" className="hover:text-green-600 font-semibold">
            SHOP
          </NavLink>

          <select 
          className="border border-gray-300 px-2 py-1 rounded min-w-37.5 outline-none"
          onChange={(e) => {const value = e.target.value;
          navigate(value === "all" ? "/product" : `/product?category=${value}`);}}
          >
            <option value="all">All Products</option> 
            <option value="vegetables">Vegetables</option>
            <option value="fruits">Fruits</option>
            <option value="dairyProducts">Dairy</option>
            <option value="dryFruits">Dry Fruits</option>
            <option value="snacks">Snacks</option>
            <option value="grains">Grains</option>
            <option value="packagedFood">Packaged Food</option>
            <option value="combo">Combo Offers</option>
          </select>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4 sm:gap-10">

          {/* Cart */}
          <Link to='/cart' className="relative">
            <img src={assets.cart_icon} className="w-8" alt="" />
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-1 rounded-full">
              2
            </span>
          </Link>

          {/* Profile */}
          <div className="group relative hidden sm:block">
            <img
              src={assets.profile_icon}
              alt=""
              className="w-8 h-8 cursor-pointer rounded-full border p-1"
            />

            <div className="group-hover:block hidden absolute right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-3 bg-white shadow-md rounded">
                <p onClick={() => navigate('/profile')} className="cursor-pointer hover:text-green-600">My Profile</p>
                <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-green-600">Orders</p>
                <p onClick={handleLogin} className="cursor-pointer hover:text-green-600">{login}</p>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <img
            onClick={() => setvisible(true)}
            src={assets.menu_icon}
            className='w-7 cursor-pointer md:hidden'
            alt=""
          />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${visible ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 md:hidden`}>

        <div className="flex justify-end p-4">
          <button onClick={() => setvisible(false)}>✕</button>
        </div>

        <div className="flex flex-col gap-5 px-6 text-gray-700">
          <NavLink onClick={() => setvisible(false)} to="/">Home</NavLink>
          <NavLink onClick={() => setvisible(false)} to="/products">Shop</NavLink>
          <NavLink onClick={() => setvisible(false)} to="/categories">Categories</NavLink>
          <NavLink onClick={() => setvisible(false)} to="/offers">Offers</NavLink>
          <NavLink onClick={() => setvisible(false)} to="/cart">Cart</NavLink>
        </div>
      </div>

    </div>
  )
}

export default Navbar