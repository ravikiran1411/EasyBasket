import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DataContext } from '../context/DataContext'
import ProductList from '../components/ProductList'
import { toast } from 'react-toastify';
import axios from 'axios';

import {assets} from '../assets/assets.js'

const ProductDetails = () => {

  const { productid } = useParams()
  const { products, currency,backend_url,token,qty,setQty,addCart} = useContext(DataContext)

  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState("")
  const [related, setRelated] = useState([])

  const roundedRating = Math.round(productData?.rating || 0)

  const [rating,setRating] = useState(0)
  const [comment, setComment] = useState("")


  const fetchProductData = async () => {

    try {
      
      const res = await axios.post(backend_url+"/api/product/singleproduct", {id:productid})

      if (!res.data.product) {
      return toast.error("Product not found")
    }

      setProductData(res.data.product)
      setImage(res.data.product.image?.[0])

    } catch (error) {
      toast.error(error)
      console.log(error);
    }
  }
  

  const fetchRelated = () => {
    if (!productData) return

    const filtered = products.filter(
      (item) => item.category === productData.category && item._id !== productData._id
    )

    setRelated(filtered.slice(0, 4))
  }


  const submitReview = async () => {
  try {

    if(!token) {
      return toast.error("please login to review.")
    }

    if (!rating || !comment) {
      return toast.error("Give rating & comment")
    }

    const response = await axios.post(backend_url + "/api/product/addreview", {id: productData._id,rating,comment},{headers:{token:localStorage.getItem("token")}})
    
    if (response.data.success) {
      
      toast.success("Review added") 
      setRating(0)
      setComment("")
      fetchProductData() 
    }
    else{
      toast.error("already reviewed")
    }

  } catch (error) {
    toast.error(error.message)
  }
}

  useEffect(() => {
    fetchProductData()
  }, [productid])

  useEffect(() => {
    fetchRelated()
  }, [productData])

  if (!productData) {
    return <div className="p-5 text-center">Loading...</div>
  }


  return (
    <div className="px-4 sm:px-10 lg:px-14 py-8">

      <div className="flex flex-col lg:flex-row gap-10">

        <div className="flex-1 flex flex-col sm:flex-row gap-4">

          <div className="flex sm:flex-col gap-3 order-2 sm:order-1 overflow-x-auto sm:overflow-y-auto sm:max-h-[450px]">
            {productData.image?.map((item, index) => (
              <img
                key={index}
                src={item}
                onClick={() => setImage(item)}
                className={`w-16 h-16 object-contain border rounded-lg cursor-pointer ${
                  image === item ? "border-green-600" : "border-gray-200"
                }`}
              />
            ))}
          </div>

          <div className="flex-1 order-1 sm:order-2 flex items-center justify-center bg-white rounded-xl shadow-sm p-4">
            <img
              src={image}
              className="w-full max-h-[350px] sm:max-h-[500px] object-contain"
            />
          </div>

        </div>

        <div className="flex-1 flex flex-col gap-4">

          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            {productData.name}
          </h1>
          
          <div className="flex items-center gap-1"> 
            {[1,2,3,4,5].map((star)=>(

              <img key={star} src={ roundedRating >= star ? assets.star_icon : assets.star_dull_icon  } alt="star"className="w-4 h-4"/>
            
            ))}
            
            <p className="text-sm text-gray-600 ml-2">({productData.numReviews || 0})</p>
          </div>
          
          <div className="flex items-center gap-3">
            <p className="text-2xl font-bold text-green-600">
              {currency} {productData.price}
            </p>
            <span className="text-sm text-gray-400 line-through">
              {currency} {productData.price + 20}
            </span>
          </div>

          <h1 className='text-xs text-gray-600'>{productData.brand}</h1>

          <div className="flex gap-2 flex-wrap">
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
              Fast Delivery
            </span>
            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
              {productData.category}
            </span>
            {
              productData.stock >0 ? <span className='p-2 text-sm text-gray-400 bg-gray-100'>In Stock</span> : <span>No stock</span>
            }
          </div>

          <p className="text-sm text-gray-600">
            {productData.description}
          </p>

          <div className="flex items-center gap-3">
            <p className="text-sm text-gray-600">Qty:</p>
            <div className="flex items-center border rounded-lg shadow-md hover:shadow-lg">
              <button
                onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                className="px-3 py-1 text-lg"
              >
                -
              </button>
              <span className="px-4">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="px-3 py-1 text-lg"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-3 mt-3">
            <button onClick={()=>addCart({productId:productData._id,quantity:qty})} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition cursor-pointer ">
              Add to Cart
            </button>

          </div>

          <div className="mt-4 text-sm text-gray-500 flex flex-col gap-1">
            <p> Fresh quality guaranteed</p>
            <p> Delivered within 10-30 mins</p>
            <p> Easy return available</p>
          </div>

        </div>

      </div>


      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">

  <div className="lg:sticky lg:top-20 h-fit border p-4 rounded">

    <p className="font-medium text-sm">Add Review</p>

    <div className="flex gap-1 my-2">
      {[1,2,3,4,5].map((star)=>(
        <img
          key={star}
          onClick={()=>setRating(star)}
          src={rating >= star ? assets.star_icon : assets.star_dull_icon}
          className="w-6 h-6 cursor-pointer"
        />
      ))}
    </div>

    <textarea
      value={comment}
      onChange={(e)=>setComment(e.target.value)}
      className="w-full border rounded p-2 text-sm"
      placeholder="Write your review"
    />

    <button
      onClick={submitReview}
      className="mt-2 bg-black text-white px-4 py-2 rounded w-full"
    >
      Submit Review
    </button>

  </div>


  <div className="max-h-[500px] overflow-y-auto pr-2">

    <h2 className="text-lg font-semibold mb-3">Customer Reviews</h2>

    {productData.reviews?.length === 0 && (
      <p className="text-gray-500 text-sm">No reviews yet</p>
    )}

    <div className="flex flex-col gap-3">

      {productData.reviews?.map((item, i)=>(
        <div key={i} className="border p-3 rounded">

          <div className="flex items-center gap-2 mb-1">
            <img src={assets.profile_icon} className="w-5 h-5" />
            <p className="text-sm font-semibold">
              {item.userName || "User"}
            </p>
          </div>

          <div className="flex gap-1 mb-1">
            {[1,2,3,4,5].map((star)=>(
              <img
                key={star}
                src={item.rating >= star ? assets.star_icon : assets.star_dull_icon}
                className="w-4 h-4"
              />
            ))}
          </div>

          <p className="text-sm text-gray-600">{item.comment}</p>

        </div>
      ))}

    </div>

  </div>

</div>

      {related.length > 0 && (
        <div className="mt-16">

          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-lg sm:text-xl font-semibold">
              Related Products
            </h2>
            <div className="w-10 h-[2px] bg-green-600"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.map((item) => (
              <ProductList
                key={item._id}
                image={item.image}
                id={item._id}
                name={item.name}
                price={item.price}
                category={item.category}
                brand={item.brand}
                quantity={item.quantity}
              />
            ))}
          </div>

        </div>
      )}

    </div>
  )
}

export default ProductDetails