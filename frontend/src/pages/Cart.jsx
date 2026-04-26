import React, { useContext, useState } from 'react'
import { DataContext } from '../context/DataContext'

const Cart = () => {

  const {products,cartData,qty,setQty,currency,token,updateCart,dataLoaded} = useContext(DataContext)
  
  if (!products.length) {
    return <div>Loading...</div>
  }

  if (!dataLoaded) {
    return <div>data loading...</div>
  }



  
  const cartItems = (products || []).filter(
  item => cartData && cartData[item._id]
)

  const total = cartItems.reduce((acc,item)=>{
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

              <div className="flex items-center gap-4">

                <div className="flex items-center gap-3">
                  <p className="text-sm text-gray-600">Qty:</p>
                  <div className="flex items-center border rounded-lg shadow-md hover:shadow-lg">
                    <button onClick={() => updateCart(item._id, cartData[item._id] - 1)} className="px-3 py-1 text-lg"> -</button>
                      <span className="px-4">{cartData[item._id]}</span>
                    <button onClick={() => updateCart(item._id, cartData[item._id] + 1)} className="px-3 py-1 text-lg">+</button>
                  </div>
                </div>

                {/* total */}
                <p className="w-20 text-right">
                  ₹ {item.price * cartData[item._id]}
                </p>

              </div>

            </div>

          ))}

          {/* TOTAL */}
          <div className="mt-6 flex justify-between items-center border-t pt-4">

            <h2 className="text-lg font-semibold">Total</h2>

            <p className="text-xl font-bold text-green-600">
              ₹ {total}
            </p>

          </div>

        </div>

      )}

    </div>
  )
}

export default Cart