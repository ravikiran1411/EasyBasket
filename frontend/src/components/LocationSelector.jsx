import React, { useContext } from 'react'
import { DataContext } from '../context/DataContext'
import { toast } from 'react-toastify'

const LocationSelector = () => {

    const {
        showLocationModal,
        setShowLocationModal,
        getUserLocation,
        cities,
        selectedCity,
        setSelectedCity
    } = useContext(DataContext)

    const handleLocation = async () => {
        await getUserLocation();
        setShowLocationModal(false);
    }

    const handleSaveLocation = () => {

        if (!selectedCity) {
            toast.error("Please select a city");
            return;
        }

        localStorage.setItem(
            "selectedCity",
            selectedCity
        );

        toast.success("Location Updated");

        setShowLocationModal(false);
    }

    if (!showLocationModal) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white p-6 rounded-xl w-[90%] max-w-md">

                <div className="flex justify-between items-center mb-5">

                    <h2 className="text-xl font-semibold">
                        Select Location
                    </h2>

                    <button
                        onClick={() =>
                            setShowLocationModal(false)
                        }
                    >
                        ✕
                    </button>

                </div>

                <button
                    className="w-full bg-black text-white py-3 rounded-lg"
                    onClick={handleLocation}
                >
                    Use Current Location
                </button>

                <div className="my-4 text-center text-gray-400">
                    OR
                </div>

                <select
                    value={selectedCity}
                    onChange={(e) =>
                        setSelectedCity(e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-3 outline-none"
                >

                    <option value="">
                        Select City
                    </option>

                    {
                        cities.map((city) => (
                            <option
                                key={city}
                                value={city}
                            >
                                {city}
                            </option>
                        ))
                    }

                </select>

                <button
                    className="w-full mt-3 bg-green-600 text-white py-3 rounded-lg"
                    onClick={handleSaveLocation}
                >
                    Save Location
                </button>

            </div>

        </div>
    )
}

export default LocationSelector