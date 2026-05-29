import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DataContext } from "../context/DataContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyProducts = () => {
  
  const { backend_url, token,currency } = useContext(DataContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      
      const response = await axios.post(backend_url + "/api/product/allvendorproducts",{},{headers: {token,}});

      if (response.data.success) {

        setProducts(response.data.products);

      } else {

        toast.error(response.data.message);

      }

    } catch (error) {

      console.log(error.message);

      toast.error(error.message);

    }

  };

  const deleteProduct = async (id) => {

    try {

        const response = await axios.post(backend_url + "/api/product/remove",{ id },{headers: {token}});

        if (response.data.success) {

            toast.success(response.data.message);

            setProducts((prev) =>
                prev.filter(
                    (item) => item._id !== id
                )
            );

        } 
        else {

          toast.error(response.data.message);
        }

    } catch (error) {

      toast.error(error.message);

    }
  };

  useEffect(() => {

    if (token) {
      fetchProducts();
    }

  }, [token]);

return (

  <div className="min-h-screen bg-gray-100 p-6">

    <div className="max-w-6xl mx-auto">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold text-gray-800">
            Inventory
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your store products
          </p>

        </div>

        <div className="mt-4 md:mt-0 bg-green-100 text-green-700 px-5 py-2 rounded-lg font-semibold">
          {products.length} Products
        </div>

      </div>

      {products.length === 0 ? (

        <div className="bg-white rounded-xl shadow-sm p-10 text-center">

          <h2 className="text-2xl font-semibold text-gray-700">
            No Products Found
          </h2>

          <p className="text-gray-500 mt-2">
            Add your first product to start selling.
          </p>

        </div>

      ) : (

        <div className="">

          {products.map((item) => (

            <div
              key={item._id}
              className="bg-white rounded-xl shadow-sm border p-4 sm:p-0 sm:pr-4 flex flex-col justify-center md:flex-row md:items-center gap-4 hover:shadow-md transition"
            >
              <img
                src={item.image?.[0]}
                alt={item.name}
                className="w-40 h-40 object-cover rounded-lg flex align-middle"
              />

              <div className="flex-1">

                <h2 className="text-xl font-semibold text-gray-800">
                  {item.name}
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  {item.brand}
                </p>

                <div className="flex flex-wrap gap-6 mt-3">

                  <div>
                    <p className="text-xs text-gray-400">
                      Price
                    </p>

                    <p className="font-semibold text-green-600">
                      {currency}{item.price}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Stock
                    </p>

                    <p className="font-semibold text-gray-700">
                      {item.stock}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Quantity
                    </p>

                    <p className="font-semibold text-gray-700">
                      {item.quantity}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Category
                    </p>

                    <p className="font-semibold text-gray-700">
                      {item.category}
                    </p>
                  </div>

                </div>

              </div>

              {/* Actions */}
              <div className="flex gap-3">

                <button onClick={() => navigate(`/vendor/edit-product/${item._id}`)} 
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Edit
                </button>

                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  onClick={() => deleteProduct(item._id)}
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  </div>

)
};

export default MyProducts;