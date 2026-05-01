
import React from 'react'
import { backendUrl, currency } from '../App'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const Order = ({token}) => {

  const [ordersData,setOrdersData] = useState([])

  const fetchAllOrders = async () => {
    try {

      const finalToken = token || localStorage.getItem("token")

      if (!finalToken) {
        return toast.error("login again..")
      }
      
      
      const response = await axios.post(backendUrl+'/api/order/allorders',{},{headers:{Authorization:`Bearer ${finalToken}`}})
      
      if (response.data.success) {
        setOrdersData(response.data.orders)
      }
      else{
        console.log(response.data.message);
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  const updateStatus = async (id,selectStatus) =>{
    try {
      
      const response = await axios.post(backendUrl+'/api/order/status',{orderId:id,status:selectStatus})

      if (response.data.success) {
        toast.success(response.data.message)
        fetchAllOrders();
      }

      else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
      
    }

  }

  useEffect(()=>{
    fetchAllOrders()
  },[token])

  return (
  <div className="p-6 bg-gray-50 min-h-screen sm:-mt-15">

    <h1 className="text-2xl font-semibold mb-6">All Orders</h1>

    {ordersData.length === 0 ? (
      <p>No orders yet</p>
    ) : (

      <div className="flex flex-col gap-5">

        {ordersData.map((order) => (

          <div key={order._id} className="bg-white rounded-xl shadow-sm border p-4">

            {order.items.map((item, i) => (

              <div
                key={i}
                className="grid grid-col-2 md:items-center md:grid-cols-[0.5fr_3fr_1.5fr_1fr] gap-4 border-b last:border-none pb-4 mb-4 last:mb-0"
              >
                <div className="shrink-0">
                  <img
                    src={item.image}
                    className="w-20 h-20 object-contain bg-gray-50 rounded-lg border"
                  />
                </div>

                <div className="flex flex-col gap-1">

                  <p className="font-semibold text-slate-800">
                    {item.name}
                  </p>

                  <p className="text-sm text-slate-800">
                    Qty: {item.qty}
                  </p>

                  <p className="text-sm text-slate-800">
                    {currency} {item.price * item.qty}
                  </p>

                </div>

                <div className="mt-2 text-md font-medium text-green-600">
                  <p>Address:</p>
                  <div className=' text-sm text-slate-800'>
                    <p>{order.address.name} ({order.address.phone})</p>
                    <p>{order.address.address}, {order.address.city}</p>
                    <p>{order.address.pincode}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">

                  <p className="text-sm text-gray-500">
                    {new Date(order.date).toLocaleString()}
                  </p>

                  <select
                    value={order.status}
                    onChange={(e)=>updateStatus(order._id,e.target.value)}
                    className="border rounded px-3 py-1 text-sm focus:outline-none"
                  >
                    <option value="Placed">Placed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>

                </div>

              </div>

            ))}

            <div className="text-right font-bold text-green-600 flex justify-between">
              <span className="text-xs bg-gray-100 px-3 py-1 rounded">
                {order.paymentMethod}
              </span>

              <div>
                Total: ₹ {order.amount}
              </div>
            </div>

          </div>

        ))}

      </div>

    )}

  </div>
)
}
export default Order