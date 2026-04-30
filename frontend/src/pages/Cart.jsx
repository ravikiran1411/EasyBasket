import React, { useContext, useState } from 'react'
import { DataContext } from '../context/DataContext'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
const Cart = () => {

  const {deliveryFee,products,cartData,qty,setQty,currency,token,updateCart,dataLoaded} = useContext(DataContext)
  const navigate = useNavigate();

  if (!dataLoaded) {
    return <div>data loading...</div>
  }
  
  if (!products.length) {
    return <div>Loading...</div>
  }

  
  const cartItems = (products || []).filter(
  item => cartData && cartData[item._id]
)

  const cartTotal = cartItems.reduce((acc,item)=>{
    return acc+item.price * cartData[item._id]
  },0) 


  return (
    <div className="px-4 sm:px-10 lg:px-14 py-8">

      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Cart is empty</p>
      ) : (

        <div className="flex flex-col gap-4">

          {cartItems.map((item) => (

            <div key={item._id} className="flex items-center justify-between border p-3 rounded-lg">

              {/* LEFT */}
              <div className="flex items-center gap-4">

                <img src={item.image[0]} className="w-16 h-16 object-contain" />

                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">₹ {item.price}</p>
                </div>

              </div>

              <div className="flex items-center gap-10">

                <div className="flex items-center gap-3">
                  <p className="text-sm text-gray-600">Qty:</p>
                  <div className="flex items-center border rounded-lg shadow-md hover:shadow-lg">
                    <button onClick={() => updateCart(item._id, cartData[item._id] - 1)} className="px-3 py-1 text-lg"> -</button>
                      <span className="px-4">{cartData[item._id]}</span>
                    <button onClick={() => updateCart(item._id, cartData[item._id] + 1)} className="px-3 py-1 text-lg">+</button>
                  </div>
                </div>

                <p className="w-20 text-right">
                  {currency} {item.price * cartData[item._id]}
                </p>

                <button onClick={() => updateCart(item._id, 0)}className="text-red-500 hover:text-red-700 text-xl mr-5 hover:shadow-md">
                  <img src={assets.bin_icon} className='w-4' />
                </button>

              </div>

            </div>

          ))}

          {/* TOTAL */}
          <div className="mt-6 flex items-end flex-col border-t pt-4">
            <div className='flex flex-col gap-1 justify-start'>
            
            <div className='flex gap-10 justify-between'> 
              <h2 className="text-lg font-semibold">Items Subtotal:</h2>
              <p className="text-xl font-bold text-green-600">
              {currency} {cartTotal}
              </p>
            </div>

            <div className='flex justify-between gap-10'>
              <h2 className="text-lg font-semibold">Delivery Fee:</h2>

              <div className='flex gap-2 items-center'>
                <p className="text-sm text-black line-through">
                  {currency} {deliveryFee}
                </p>
                <p className='text-green-600 text-md font-semibold'>Free Delivery</p>
              </div>

            </div>
            <hr></hr>

            <div className='flex justify-between gap-3'>
              <h2 className="text-lg font-semibold">Grand Total</h2>
              <p className="text-xl font-bold text-green-600">
              {currency} {cartTotal}
              </p>
            </div>

            <div className='flex justify-center mt-2'>
              <button onClick={()=>navigate('/placeorder')} className='border-green-800 bg-green-600 hover:bg-green-500 text-white shadow-md hover:shadow-lg p-1 px-2 rounded text-lg font-medium cursor-pointer'>Buy Now</button>
              </div>
            </div>
          </div>

        </div>

      )}

    </div>
  )
}

export default Cart