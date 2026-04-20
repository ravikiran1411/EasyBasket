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

      console.log(response.data);
      
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
      
      const response = await axios.post(backendUrl+'/api/product/remove',{id:id},{headers:{Authorization:`Bearer ${token}`}})

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
    <div className='mx-3 md:mx-5 px-2 md:px-3'> 
      <p className='mb-5 text-xl md:text-2xl font-medium text-center'>All products list</p>
      <div className='flex flex-col gap-3'>
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-4 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center pr-20'>Action</b>
        </div>

        {
          list.map((item,index)=>(
          <div key={index} className='flex flex-col gap-2 p-3 border rounded-md md:grid md:grid-cols-[1fr_3fr_1fr_1fr_1fr] md:items-center md:gap-2 md:px-2 md:rounded-none'>

            <div className='flex justify-center md:block'>
              <img src={item.image[0]} alt="" className='w-24 h-24 md:w-20 md:h-20 object-cover' />
            </div>

            <p className='text-center md:text-left font-medium'>{item.name}</p>

            <p className='text-center md:text-left text-green-500 font-medium'>{item.category}</p>

            <p className='text-center md:text-left font-semibold'>{currency} {item.price}</p>
            <div className='flex justify-center md:block'>
              <img className='cursor-pointer hover:bg-red-500 hover:rounded-full p-1 md:ml-10' src={assets.delete_icon} alt='X' onClick={()=>removeProduct(item._id)}/>
            </div>

          </div>))}
      </div>
    </div>
  )
}

export default List 