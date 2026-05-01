import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../context/DataContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Orders = () => {

  const { token, backend_url, currency } = useContext(DataContext)
  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        backend_url + '/api/order/userorders',
        {},
        { headers: { token } }
      )

      if (response.data.success) {
        setOrders(response.data.orderData)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className="px-4 sm:px-10 lg:px-14 py-8 bg-gray-50 min-h-screen">

      <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet</p>
      ) : (

        <div className="flex flex-col gap-6">

          {orders.map((order, index) => (

            <div key={index} className="bg-white rounded-xl shadow-sm border p-5">

              {/* 🔹 HEADER */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">

                <p className="text-sm text-gray-500">
                  {new Date(order.date).toLocaleString()}
                </p>

                <span className={`w-fit px-3 py-1 rounded-full text-xs font-medium
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

              {/* 🔹 ITEMS */}
              <div className="flex flex-col gap-4">

                {order.items.map((item, i) => (

                  <div
                    key={i}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                  >

                    {/* LEFT */}
                    <div className="flex items-center gap-4">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-contain bg-white rounded-md border"
                      />

                      <div>
                        <p className="font-medium text-sm text-gray-800">
                          {item.name}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          Qty: {item.qty}
                        </p>
                      </div>

                    </div>

                    {/* RIGHT */}
                    <p className="text-sm font-semibold text-green-600">
                      {currency} {item.price * item.qty}
                    </p>

                  </div>

                ))}

              </div>

              {/* 🔹 FOOTER */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-5 pt-4 border-t gap-2">

                <p className="font-bold text-lg text-gray-800">
                  Total:{" "}
                  <span className="text-green-600">
                    {currency} {order.amount}
                  </span>
                </p>

                <span className="text-xs bg-gray-100 px-3 py-1 rounded-full w-fit">
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