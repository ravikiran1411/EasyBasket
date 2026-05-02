
import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../context/DataContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { assets } from '../assets/assets'
const PlaceOrder = () => {

    const {token,deliveryFee,currency,backend_url,cartData,setCartData,products,fetchProfile,form,setForm} = useContext(DataContext)
    const navigate = useNavigate()
    const [payment,setPayment] = useState("COD")

    const handleChange = (e) => {
        setForm({...form,[e.target.name]:e.target.value})

    }

    const order = async () => {
        
        try {

            if (!token) {
                return toast.error("please login again")
            }

            if (!form.name || !form.phone || !form.address || !form.city || !form.pincode ) {
                return toast.error("fill all required fields.")
            }

            switch (payment) {

                case "COD": {
                    
                    await axios.post(backend_url + "/api/profile/update",{
                        name: form.name,
                        phone: form.phone,
                        address: form.address,
                        city: form.city,
                        pincode: form.pincode 
                    },{},{headers:{token}})

                    const response = await axios.post(backend_url+'/api/order/codorder',{address:form},{headers:{token}})
                    console.log("order second");


                    if (response.data.success) {

                        console.log(response.data);
                        
                        toast.success("order placed..")
                        setCartData({})
                        navigate('/orders')
                    }
                    else{
                        toast.error(response.data.message)
                        console.log("order now");
                    }

                    break;
                }

                case 'STRIPE' :
                    break
                
                case 'RAZORPAY':
                    break
            
                default:
                    break;
            }

        } catch (error) {
            console.log(error.message);
            toast.error(error.message)            
        }
    }

    const total = (products || []).reduce((acc,item)=>{
        if (cartData[item._id]) {
            return acc + item.price * cartData[item._id]
        }
        return acc
    },0)


    useEffect(()=>{
        fetchProfile()
    },[])

  return (
    <div className="px-4 sm:px-10 lg:px-14 py-8">

      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div className="flex flex-col gap-4">
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="address"
            placeholder="address i.e,landmark,door no."
            value={form.address}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>

        <div className="border p-4 rounded-lg h-fit">

          <h2 className="font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>{currency} {total}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Delivery</span>
            <div className='flex gap-2'> 
            <span className='line-through'>{currency} {deliveryFee}</span>
            <span className='font-medium'>Free Delivery</span>
            </div>
          </div>

          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total</span>
            <span className="text-green-600">{currency} {total}</span>
          </div>

          <div className="mt-6">
            <p className="font-medium text-xl mb-3" >Payment Method</p>
            <hr />
            <div className="flex flex-col gap-3 pt-2">
                <div
                    onClick={() => setPayment("COD")}
                    className={`flex items-center gap-3 border p-3 rounded cursor-pointer transition 
                    ${payment === "COD" ? "border-green-600 bg-green-50" : "border-gray-200"}`}
                    >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center
                        ${payment === "COD" ? "border-green-600" : "border-gray-400"}`}>
                        {payment === "COD" && (
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        )}
                    </div>
                    
                    <p className="text-sm font-medium text-gray-700">Cash on Delivery</p>
                </div>

                <div
                    onClick={() => setPayment("RAZORPAY")}
                    className={`flex items-center gap-3 border p-3 rounded cursor-pointer transition 
                    ${payment === "RAZORPAY" ? "border-green-600 bg-green-50" : "border-gray-200"}`}
                >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center
                        ${payment === "RAZORPAY" ? "border-green-600" : "border-gray-400"}`}>
                        {payment === "RAZORPAY" && (
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        )}
                    </div>

                    <img src={assets.razorpay_logo} className="h-5" />    
                </div>
                
                <div
                onClick={() => setPayment("STRIPE")}
                className={`flex items-center gap-3 border p-3 rounded cursor-pointer transition 
                ${payment === "STRIPE" ? "border-green-600 bg-green-50" : "border-gray-200"}`}
                >

                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center
                    ${payment === "STRIPE" ? "border-green-600" : "border-gray-400"}`}>
                    {payment === "STRIPE" && (
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    )}
                    </div>
                    
                    <img src={assets.stripe_logo} className="h-5"/>
                </div>

        </div>
    </div>


    <button onClick={()=>order()} className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
        Place Order
    </button>
    </div>
    </div></div>
  )

}

export default PlaceOrder