import React from 'react'
import { useContext } from 'react'
import { DataContext } from '../context/DataContext'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'

const Orders = () => {

  const {token,backend_url,currency} = useContext(DataContext)
  const [orders,setOrders] = useState([])

  const fetchOrders = async () =>{
    try {
      const response = await axios.post(backend_url+'/api/order/userorders',{},{headers:{token}})
      
      if (response.data.success) {
        setOrders(response.data.orderData)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error.message);
      toast.error(error.message)      
    }
  }

  useEffect(()=>{
    fetchOrders()
  },[])

  return (
    <div className="px-4 sm:px-10 lg:px-14 py-8">

      <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet</p>
      ) : (

        <div className="flex flex-col gap-6">

          {orders.map((order, index) => (

            <div key={index} className="border rounded-lg p-4 shadow-sm">

              {/* HEADER */}
              <div className="flex justify-between items-center mb-3 text-sm text-gray-600">
                <p>
                  {new Date(order.date).toLocaleString()}
                </p>

                <span className={`px-3 py-1 rounded text-xs font-medium
                  ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Shipped"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* ITEMS */}
              <div className="flex flex-col gap-3">

                {order.items.map((item, i) => (

                  <div key={i} className="flex items-center justify-between border-b pb-2">

                    <div className="flex items-center gap-3">

                      <img
                        src={item.image}
                        className="w-14 h-14 object-contain"
                      />

                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          Qty: {item.qty}
                        </p>
                      </div>

                    </div>

                    <p className="text-sm font-medium">
                      {currency} {item.price * item.qty}
                    </p>

                  </div>

                ))}

              </div>

              {/* FOOTER */}
              <div className="flex justify-between items-center mt-4">

                <p className="font-bold text-green-600">
                  Total: {currency} {order.amount}
                </p>

                <span className="text-xs bg-gray-100 px-3 py-1 rounded">
                  {order.paymentMethod}
                </span>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  )

}

export default Orders