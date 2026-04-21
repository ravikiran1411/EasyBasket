import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from '../context/DataContext'

function ProductList({ id, image, name, price, category, brand, quantity,bestSeller }) {

  const { currency } = useContext(DataContext)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition duration-300 overflow-hidden group">

      <Link to={`/product/${id}`} className="block">

        <div className="relative overflow-hidden bg-gray-100">

          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-0"></div>

          <span className="absolute bottom-2 right-2 bg-white/90 backdrop-blur text-gray-700 text-xs px-3 py-1 rounded-full shadow z-10 capitalize">
            {category}
          </span>

          <img
            src={image?.[0]}
            alt={name}
            className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
          />
        {
            bestSeller && (
                <span className="absolute top-2 left-2 text-green-600 bg-green-400/40 text-xs font-bold py-1 px-3 shadow-md z-10">
            BestSeller
          </span>
            )
          }
        </div>

        <div className="p-4 flex flex-col gap-1">
          <p className="text-xs text-gray-400 uppercase tracking-wide">
            {brand || "Generic"}
          </p>
          <p className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug">
            {name}
          </p>
          <p className="text-xs text-gray-500">
            {quantity || "1 unit"}
          </p>

          <p className="mt-1 text-lg font-bold text-green-600">
            {currency} {price}
          </p>

        </div>
      </Link>

      <div className="px-4 pb-4">
        <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm py-2.5 rounded-lg font-medium hover:scale-[1.03] active:scale-95 transition">
          Add to Cart
        </button>
      </div>

    </div>
  )
}

export default ProductList