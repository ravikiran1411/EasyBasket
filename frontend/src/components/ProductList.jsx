import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from '../context/DataContext'

function ProductList({ id, image, name, price }) {
  const { currency } = useContext(DataContext)

  return (
    <Link to={`/products/${id}`} className="group block bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden">
      <div className="overflow-hidden bg-gray-100">
        <img
        src={image[0]}
        alt={name}
        className="w-full h-40 sm:h-48 md:h-52 lg:h-56 object-cover group-hover:scale-110 transition duration-300"
        />
      </div>

      <div className="p-3 sm:p-4">
        <p className="text-sm sm:text-base font-medium text-gray-800 line-clamp-2">{name}</p>
        <p className="mt-1 text-base sm:text-lg font-semibold text-green-600">{currency} {price}</p>
      </div>
    </Link>
  )
}

export default ProductList