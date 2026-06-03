import React, { useContext } from 'react'
import { DataContext } from '../context/DataContext'

const LocationUnavailable = () => {

    const { setShowLocationModal } =
    useContext(DataContext);

    return (

        <div className="flex flex-col items-center justify-center py-20 text-center">

            <div className="text-6xl mb-4">
                📍
            </div>

            <h1 className="text-3xl font-bold text-gray-800">
                Oops !!
            </h1>

            <p className="mt-3 text-gray-600 max-w-md">
                EasyBasket is currently not available at your location.
            </p>

            <button
                onClick={() =>
                    setShowLocationModal(true)
                }
                className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
                Change Location
            </button>

        </div>

    )
}

export default LocationUnavailable