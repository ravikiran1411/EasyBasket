
import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify';
import axios from 'axios';
import { backendUrl } from '../App';


const Add = ({token}) => {

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [brand,setBrand] = useState("")
  const [stock,setStock] = useState(0)
  const [bestseller, setBestseller] = useState(false);


  const submitHandler = async (e) =>{
    e.preventDefault();
    const finalToken = localStorage.getItem("token") || token;

    if(!finalToken) {
      return toast.error("no token , login again..")
    }

    try {

      const formData = new FormData();

      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("brand",brand)
      formData.append("stock",stock)
      formData.append("bestSeller",bestseller)

      image1 && formData.append("image1",image1)
      image2 && formData.append("image2",image2)
      image3 && formData.append("image3",image3)
      image4 && formData.append("image4",image4)
      console.log(formData);

      const response = await axios.post(backendUrl+'/api/product/add',formData,{headers:{Authorization:`Bearer ${finalToken}`}})
      console.log(response.data);
      
      if(response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setPrice("")
        setBrand("")
        setStock(0)

      }
      else{
        toast.error(response.data.message);
      }



    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }



  }

  return (

    <div className="flex justify-center items-center min-h-screen px-4 lg:-mt-25">
      <form onSubmit={submitHandler} className="w-full max-w-2xl bg-white shadow-md rounded-lg p-5 flex flex-col gap-4">
        <div>
          <p className="mb-2">Upload Image</p>
            <div className="flex gap-2">
              <label htmlFor="image1">
                <img
                  src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
                  alt=""
                  className="w-20 h-20"
                />
                <input
                  onChange={(e) => setImage1(e.target.files[0])}
                  type="file"
                  id="image1"
                  hidden
                />
              </label>
            <label htmlFor="image2">
              <img
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
              className="w-20 h-20"
              />
              <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
              />
            </label>

            <label htmlFor="image3"> 
              <img
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
              className="w-20 h-20"
              />
              <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
              />
            </label>

            <label htmlFor="image4">
              <img
                src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
                alt=""
                className="w-20 h-20"
              />
              <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
              />
            </label>
          </div>
        </div>


        <div>
          <p className="mb-1">Product Name</p>
          <input
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
            placeholder="Enter product name"
          />
        </div>

        <div>
          <p className="mb-1">Description</p>
          <textarea
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
            placeholder="Enter description"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className='flex flex-col w-1/2'>
            <p className="mb-1">Price</p>
            <input
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Price"
            />

          </div>
          <div className='flex flex-col w-1/2'>
            <p className="mb-1">Stock</p>
            <input
              value={stock}
              onChange={(e)=>setStock(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Stock"
            />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className='w-1/2'>
            <p className="mb-1">Category</p>

            <select
            onChange={(e)=>setCategory(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
            >
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits</option>
              <option value="dairyProducts">Dairy Products</option>
              <option value="dryFruits">Dry Fruits</option>
              <option value="snacks">Snacks</option>
              <option value="packagedFood">Packaged Food</option>
              <option value="grains">Grains</option>
            </select>
          </div>
          <div className='w-1/2'>
            <p className="mb-1">Brand</p>
            <input
              value={brand}
              onChange={(e)=>setBrand(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Brand"
             />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={bestseller}
            onChange={()=>setBestseller(prev=>!prev)}
          />
          <p>Add to bestseller</p>
        </div>
        <button className="bg-black text-white py-2 rounded-md hover:bg-gray-800">ADD PRODUCT</button>

  </form>
</div>

  )
}

export default Add