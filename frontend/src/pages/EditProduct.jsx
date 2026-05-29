import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../context/DataContext";
import { toast } from "react-toastify";

const EditProduct = () => {

    const { id } = useParams();

    const { backend_url, token } = useContext(DataContext);

    const [image, setImage] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        quantity: "",
        category: "",
        brand: "",
        stock: "",
        bestSeller: false,
    });

    const fetchProduct = async () => {

        try {

            const response = await axios.post(
                backend_url + "/api/product/singleproduct",
                { id }
            );

            if (response.data.success) {

                const p = response.data.product;

                setImage(p.image?.[0]);

                setFormData({
                    name: p.name || "",
                    description: p.description || "",
                    price: p.price || "",
                    quantity: p.quantity || "",
                    category: p.category || "",
                    brand: p.brand || "",
                    stock: p.stock || "",
                    bestSeller: p.bestSeller || false,
                });

            }

        } catch (error) {

            console.log(error.message);

        }

    };

    useEffect(() => {
        fetchProduct();
    }, []);

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));

    };

    const updateProduct = async (e) => {

        e.preventDefault();
        console.log(formData)

        try {

            const response = await axios.post(backend_url + "/api/product/update",{id,...formData,},{headers: {token,}});

            if (response.data.success) {

                toast.success(
                    "Product updated successfully"
                );

            } else {

                toast.error(
                    response.data.message
                );

            }

        } catch (error) {

            toast.error(error.message);

        }

    };

    if (!formData.name) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-semibold">
                    Loading...
                </h1>
            </div>
        );
    }

    return (

        <div className="min-h-screen bg-gray-100 py-6 px-4">

            <div className="max-w-5xl mx-auto">

                <div className="mb-6">

                    <h1 className="text-2xl md:text-3xl font-bold">
                        Edit Product
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Update your product information
                    </p>

                </div>

                <form
                    onSubmit={updateProduct}
                    className="bg-white rounded-2xl shadow-sm border overflow-hidden"
                >

                    <div className="grid grid-cols-1 lg:grid-cols-3">

                        {/* Image */}
                        <div className="p-6 border-b lg:border-b-0 lg:border-r flex justify-center">

                            <img
                                src={image}
                                alt=""
                                className="w-full max-w-xs h-64 object-cover rounded-xl"
                            />

                        </div>

                        {/* Form */}
                        <div className="lg:col-span-2 p-6">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <div>
                                    <label className="text-sm text-gray-500">
                                        Product Name
                                    </label>

                                    <input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg p-3 mt-1"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-500">
                                        Brand
                                    </label>

                                    <input
                                        name="brand"
                                        value={formData.brand}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg p-3 mt-1"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-500">
                                        Price
                                    </label>

                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg p-3 mt-1"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-500">
                                        Stock
                                    </label>

                                    <input
                                        type="number"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg p-3 mt-1"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-500">
                                        Quantity
                                    </label>

                                    <input
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg p-3 mt-1"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-500">
                                        Category
                                    </label>

                                    <input
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg p-3 mt-1"
                                    />
                                </div>

                            </div>

                            <div className="mt-4">

                                <label className="text-sm text-gray-500">
                                    Description
                                </label>

                                <textarea
                                    rows="5"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-3 mt-1"
                                />

                            </div>

                            <div className="mt-4 flex items-center gap-3">

                                <input
                                    type="checkbox"
                                    name="bestSeller"
                                    checked={formData.bestSeller}
                                    onChange={handleChange}
                                />

                                <span>
                                    Bestseller Product
                                </span>

                            </div>

                            <button
                                type="submit"
                                className="mt-6 w-full md:w-auto bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
                            >
                                Update Product
                            </button>

                        </div>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default EditProduct;