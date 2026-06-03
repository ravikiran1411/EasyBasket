import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateStore = () => {

    const {token,backend_url,setUserData} = useContext(DataContext);
    const navigate=useNavigate()

    const [formData, setFormData] = useState({
        storeName: "",
        city:"",
        address: "",
        latitude: "",
        longitude: "",
    });

    const handleChange = (e) => {

        setFormData({...formData,[e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        
            const response = await axios.post(backend_url+'/api/stores/createvendor',{
                storeName:formData.storeName,
                city:formData.city,
                address:formData.address,
                latitude:formData.latitude,
                longitude:formData.longitude,
            },{headers:{token}})

            if (response.data.success) {
                toast.success("vender account created.")
                setUserData((prev)=>({...prev,accountType:"vendor"}));
                navigate("/vendor/dashboard")   
            }
            else{

                toast.error(response.data.message)
            }
        } 
        catch (error) {
            console.log(error.message);
            
        }
    };

    return (

        <div className="min-h-screen flex justify-center items-center bg-gray-100">

        <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        >

        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Your Store
        </h1>

        <input
          type="text"
          name="storeName"
          placeholder="Store Name"
          value={formData.storeName}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
          required
        />

        <input 
        type="text" 
        name="city" 
        placeholder="enter city" 
        value={formData.city} 
        onChange={handleChange} 
        className="w-full border p-3 rounded mb-4" 
        />

        <input
          type="number"
          name="latitude"
          placeholder="Latitude"
          value={formData.latitude}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
          required
        />

        <input
          type="number"
          name="longitude"
          placeholder="Longitude"
          value={formData.longitude}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
          required
        />



        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded"
        >
          Create Store
        </button>

      </form>

    </div>

  );
};

export default CreateStore;