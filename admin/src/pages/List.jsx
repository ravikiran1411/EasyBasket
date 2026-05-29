import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { currency } from '../App'
import { assets } from '../assets/assets'


const List = ({token}) => {

  const [list,setList] = useState([])

  const fetchData = async () =>{
    try {

      const response = await axios.post(backendUrl+'/api/product/list')
      
      if (response.data.success) {
        setList(response.data.products)
      }
      else{
      console.log(response.data.message);
      toast.error(response.data,message);
      }

    } catch (error) {
      
      console.log(error);
      toast.error(error);
      
    }
  }

  const removeProduct = async (id) =>{

    try {
      
      const response = await axios.post(backendUrl+'/api/product/admin/remove',{id:id},{headers:{Authorization:`Bearer ${token}`}})

      if (response.data.success) {
        toast.success("product removed")
        await fetchData()
      }
      else{
        toast.error(response.data.message)
        console.log(response.data);
        
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }

  }

  useEffect(()=>{
    fetchData()
  },[])

  return (
  <div className="p-4 md:p-6">

    {/* Heading */}
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Products
      </h2>

      <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium">
        Total : {list.length}
      </div>
    </div>

    {/* Desktop Table */}
    <div className="hidden lg:block bg-white rounded-xl shadow overflow-hidden">

      <div className="grid grid-cols-[100px_2fr_1fr_1fr_80px] bg-gray-100 px-6 py-4 font-semibold text-gray-700">
        <p>Image</p>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p>Action</p>
      </div>

      {list.map((item) => (
        <div
          key={item._id}
          className="grid grid-cols-[100px_2fr_1fr_1fr_80px] items-center px-6 py-4 border-b hover:bg-gray-50 transition"
        >
          <img
            src={item.image[0]}
            alt=""
            className="w-16 h-16 rounded-lg object-cover"
          />

          <p className="font-medium">{item.name}</p>

          <p className="text-green-600">
            {item.category}
          </p>

          <p className="font-semibold">
            {currency} {item.price}
          </p>

          <button
            onClick={() => removeProduct(item._id)}
            className="w-fit p-2 rounded-full hover:bg-red-100"
          >
            <img
              src={assets.delete_icon}
              alt=""
              className="w-5 h-5"
            />
          </button>
        </div>
      ))}
    </div>

    {/* Mobile + Tablet Cards */}
    <div className="lg:hidden flex flex-col gap-4">

      {list.map((item) => (
        <div
          key={item._id}
          className="bg-white rounded-xl shadow-sm border p-4"
        >
          <div className="flex gap-4">

            <img
              src={item.image[0]}
              alt=""
              className="w-24 h-24 rounded-lg object-cover"
            />

            <div className="flex-1">

              <h3 className="font-semibold text-lg">
                {item.name}
              </h3>

              <p className="text-gray-500 text-sm">
                {item.category}
              </p>

              <p className="mt-2 font-bold text-green-600">
                {currency} {item.price}
              </p>

              <button
                onClick={() => removeProduct(item._id)}
                className="mt-3 flex items-center gap-2 text-red-500"
              >
                <img
                  src={assets.delete_icon}
                  alt=""
                  className="w-5 h-5"
                />
                Delete
              </button>

            </div>
          </div>
        </div>
      ))}

    </div>

    {/* Empty State */}
    {list.length === 0 && (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">
          No Products Found
        </p>
      </div>
    )}

  </div>
);


}

export default List 