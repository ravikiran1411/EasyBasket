import React, { useState, useContext, useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets.js'
import { DataContext } from '../context/DataContext.jsx'
import { toast } from 'react-toastify'

const Navbar = () => {
  const [visible, setvisible] = useState(false)
  const { token, setToken,search,setSearch,showSearch,setShowSearch,cartData} = useContext(DataContext)
  const [login, setLogin] = useState("Login")

  const navigate = useNavigate()
  const location = useLocation()

  const loginSet = () => {
    if (token) setLogin('Logout')
    else setLogin('Login')
  }

  const handleLogin = () => {
    if (token) {
      setToken("")
      localStorage.removeItem("token")
      navigate('/login')
      toast.success("Logged out")
    } else {
      navigate('/login')
    }
  }

  const handleKeydown = (e) =>{
    if(e.key==="Enter") {
      if (location.pathname!=="/product") {
        navigate(`/product`)
      }
    }
  }

  const handleSearchClick = () => {
    if (location.pathname === "/product") {
      setShowSearch(true)
    } else {
      navigate("/product")
      setTimeout(() => setShowSearch(true), 0)
    }
  }

  const cartCount =Object.values(cartData || {}).reduce((a,b)=>a+b,0)

  useEffect(() => {
    loginSet()
  }, [token])

  return (
    <div className="bg-white shadow-sm sticky top-0 z-50">

      <div className="flex justify-between items-center gap-3 sm:gap-5 px-3 sm:px-10 py-3">

        {/* LEFT */}
        <div className="flex items-center justify-between gap-2 sm:gap-10">
          <Link to="/" className="text-md sm:text-2xl font-bold text-green-700">
            <img src={assets.logo} className='h-7 sm:h-10 ' />
          </Link>

          {/* 👉 mobile lo hide */}
          <div className='hidden sm:flex flex-col sm:flex-row items-center gap-1 text-xs sm:text-sm cursor-pointer'>
            <img src={assets.map_icon} className='w-4 h-4' alt="" />
            <p className='text-xm'>Hyderabad</p>
          </div>
        </div>

        {/* SEARCH */}
        <div className="flex-1 mx-2 sm:mx-4 relative flex justify-end">
          <input
            type="text"
            placeholder="Search groceries..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            onKeyDown={handleKeydown}
            className="hidden sm:block w-150 px-4 py-2 pr-10 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-green-400"
          />

          <img
          src={assets.search_icon}
          onClick={ ()=> {
            if (location.pathname!=='/product') {
              navigate('/product')}
            }}
          className="hidden sm:block w-5 sm:absolute sm:right-3 sm:top-1/2 sm:-translate-y-1/2 opacity-60 cursor-pointer"
          />
        </div>

        <img
        src={assets.search_icon}
        alt="search"
        onClick={handleSearchClick}
        className="w-5 h-5 cursor-pointer sm:hidden"
        />
       
        {/* DESKTOP NAV (UNCHANGED) */}
        <div className='hidden md:flex items-center gap-3 mx-5'>
          <NavLink to="/product" className="hover:text-green-600 font-semibold">
            SHOP
          </NavLink>

          <select 
          className="border border-gray-300 px-2 py-1 rounded min-w-37.5 outline-none"
          onChange={(e) => {
            const value = e.target.value;
            navigate(value === "all" ? "/product" : `/product?category=${value}`);
          }}
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

        <div className="flex items-center gap-3 sm:gap-10">

          <Link to='/cart' className="relative">
            <img src={assets.cart_icon} className="w-7 sm:w-8" alt="" />
            <span className="absolute -top-2 -right-2 bg-yellow-400 min-w-[16px] sm:min-w-[18px] text-center text-black text-[10px] sm:text-xs px-1 rounded-full">
              {cartCount}
            </span>
          </Link>

          <div className="group relative hidden sm:block">
            <img
              src={assets.profile_icon}
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

          <img
            onClick={() => setvisible(true)}
            src={assets.menu_icon}
            className='w-6 sm:w-7 cursor-pointer md:hidden'
          />
        </div>
      </div>

      <div className={`fixed top-0 right-0 h-full w-[80%] max-w-xs bg-white shadow-lg transform ${visible ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 md:hidden`}>

        <div className="flex justify-end p-4">
          <button onClick={() => setvisible(false)}>X</button>
        </div>

        <div className="flex flex-col gap-5 px-6 text-gray-700">
          <NavLink onClick={() => setvisible(false)} to="/">Home</NavLink>
          <NavLink onClick={() => setvisible(false)} to="/profile">My Profile</NavLink>
          <NavLink onClick={() => setvisible(false)} to="/product">Shop</NavLink>
          <NavLink onClick={() => setvisible(false)} to="/cart">Cart</NavLink>
          <NavLink onClick={() => setvisible(false)} to="/orders">Orders</NavLink>

        </div>
      </div>

    </div>
  )
}

export default Navbar