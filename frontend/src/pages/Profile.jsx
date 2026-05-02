import React, { useContext, useEffect, useState } from "react"
import { DataContext } from "../context/DataContext"
import { toast } from "react-toastify"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Profile = () => {

  const [edit, setEdit] = useState(false)
  const { token, backend_url, form, setForm, fetchProfile, currency } = useContext(DataContext)
  const navigate = useNavigate()

  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    try {
      const res = await axios.post(
        backend_url + "/api/order/userorders", {}, { headers: { token } }
      )

      if (res.data.success) {
        setOrders(res.data.orderData)
      }

    } catch (error) {
      console.log(error.message)
    }
  }

  const updateProfile = async () => {
    try {

      const res = await axios.post(
        backend_url + "/api/profile/update",
        {
          name: form.name,
          phone: form.phone,
          address: form.address,
          city: form.city,
          pincode: form.pincode
        },
        { headers: { token } }
      )

      if (res.data.success) {
        toast.success("Profile updated")
        setEdit(false)
        fetchProfile()
      } else {
        toast.error(res.data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const logout = () => {
    localStorage.removeItem("token")
    toast.success("Logged out")
    window.location.reload()
  }

  const totalOrders = orders.length
  const totalSpent = orders.reduce((acc, order) => acc + (order.amount || 0), 0)

  useEffect(() => {
    fetchProfile()
    fetchOrders()
  }, [token])

  return (
    <div className="px-4 sm:px-10 lg:px-14 py-6 sm:py-8 bg-gray-100 min-h-screen">

      <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm text-center">

          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full bg-gray-200 flex items-center justify-center text-xl sm:text-2xl font-bold">
            {form.name ? form.name[0] : "U"}
          </div>

          <p className="mt-3 sm:mt-4 font-semibold text-base sm:text-lg">{form.name}</p>
          <p className="text-xs sm:text-sm text-gray-500">{form.email}</p>

        </div>

        <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-xl shadow-sm">

          <div className="flex justify-between mb-4">
            <h2 className="font-semibold">Personal Details</h2>

            <button
              onClick={() => setEdit(!edit)}
              className="text-green-600 text-sm"
            >
              {edit ? "Cancel" : "Edit"}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <input name="name" value={form.name} onChange={handleChange} disabled={!edit} className="border p-2 rounded text-sm sm:text-base" />
            <input name="email" value={form.email} disabled className="border p-2 rounded bg-gray-100 text-sm sm:text-base" />
            <input name="phone" value={form.phone} onChange={handleChange} disabled={!edit} className="border p-2 rounded text-sm sm:text-base" />
            <input name="city" value={form.city} onChange={handleChange} disabled={!edit} className="border p-2 rounded text-sm sm:text-base" />
            <input name="address" value={form.address} onChange={handleChange} disabled={!edit} className="border p-2 rounded col-span-1 sm:col-span-2 text-sm sm:text-base" />
            <input name="pincode" value={form.pincode} onChange={handleChange} disabled={!edit} className="border p-2 rounded text-sm sm:text-base" />
          </div>

          {edit && (
            <button
              onClick={updateProfile}
              className="mt-4 sm:mt-5 w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm sm:text-base"
            >
              Save Changes
            </button>
          )}

        </div>

      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">

        <div className="bg-white p-4 rounded-xl shadow-sm text-center flex flex-col gap-1 sm:gap-2">
          <p className="text-gray-500 text-xs sm:text-sm">Total Orders</p>
          <p className="text-lg sm:text-xl font-bold text-gray-800">{totalOrders}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm text-center flex flex-col gap-1 sm:gap-2">
          <p className="text-gray-500 text-xs sm:text-sm">Total Spent</p>
          <p className="text-lg sm:text-xl font-bold text-green-600">{currency} {totalSpent}</p>
        </div>

      </div>

      <div className="mt-6 bg-white p-4 sm:p-6 rounded-xl shadow-sm">

        <div className="flex justify-between mb-4">
          <h2 className="font-semibold">Order History</h2>

          <button
            onClick={() => navigate("/orders")}
            className="text-sm text-green-600"
          >
            View All
          </button>
        </div>

        {orders.length === 0 ? (
          <p className="text-gray-500 text-sm">No orders yet</p>
        ) : (

          <div className="flex flex-col gap-3">

            {orders.slice(0, 5).map((order) =>
              order.items.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-gray-50 p-3 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      className="w-12 h-12 sm:w-14 sm:h-14 object-contain bg-white rounded border"
                    />
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">₹ {item.price}</p>
                    </div>
                  </div>
                  <span
                    className={`self-start sm:self-auto text-xs px-2 py-1 rounded
                      ${order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {order.status}
                  </span>

                </div>
              ))
            )}

          </div>
        )}

      </div>

      <div className="mt-6 bg-white p-4 sm:p-6 rounded-xl shadow-sm">

        <h2 className="font-semibold mb-3">Quick Actions</h2>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">

          <button
            onClick={() => navigate("/orders")}
            className="w-full sm:w-auto px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
          >
            My Orders
          </button>

          <button
            onClick={logout}
            className="w-full sm:w-auto px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  )
}

export default Profile