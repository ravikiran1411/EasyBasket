import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { DataContext } from "../context/DataContext";
import { useEffect } from "react";

const StoreSettings = () => {

  const { backend_url, token } = useContext(DataContext);

  const [formData, setFormData] = useState({
    storeName: "",
    address: "",
    latitude: "",
    longitude: "",
    deliveryRadius: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(backend_url + "/api/stores/update",formData,{headers: {token}});

      if (response.data.success) {

        toast.success(response.data.message);

      } else {

        toast.error(response.data.message);

      }

    } catch (error) {

      toast.error(error.message);

    }

  };

  const fetchStore = async () => {
    
    try {
      
      const response = await axios.get(backend_url + "/api/stores/mystore",{headers:{token}});

      if (response.data.success) {

        const store = response.data.storeData;
        
        setFormData({

          storeName: store.storeName || "",
          address: store.address || "",
          latitude: store.location?.coordinates?.[1] || "",
          longitude: store.location?.coordinates?.[0] || "",
          deliveryRadius: store.deliveryRadius || "",
        });
      }
    } catch (error) {

      console.log(error.message);
    }
  };
  
  useEffect(() => {

    if (token) {
      fetchStore();
    }
  }, [token]);

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6">

        <h1 className="text-3xl font-bold mb-6">
          Store Settings
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="storeName"
            placeholder="Store Name"
            value={formData.storeName}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="number"
            name="latitude"
            placeholder="Latitude"
            value={formData.latitude}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="number"
            name="longitude"
            placeholder="Longitude"
            value={formData.longitude}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="number"
            name="deliveryRadius"
            placeholder="Delivery Radius"
            value={formData.deliveryRadius}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded"
          >
            Update Store
          </button>

        </form>

      </div>

    </div>

  );

};

export default StoreSettings;