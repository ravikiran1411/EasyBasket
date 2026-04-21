import React from 'react'
import { assets } from '../assets/assets'

const Delivery_in10min = () => {
  return (
    <div className="mx-2 sm:mx-8 my-2 sm:my-5 md:my-8 lg:mx-14 flex flex-col gap-3">

      <div className="relative overflow-hidden bg-[#1a7a4a] rounded-xl 
      px-3 py-4 sm:pl-12 sm:py-0  
      flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-8">

        <div className="flex flex-col gap-2 sm:gap-3 z-10 max-w-sm">

          <div className="flex items-center gap-2 bg-white/15 rounded-full px-3 py-1 w-fit">
            <span className="w-2 h-2 rounded-full bg-[#7effc0]" />
            <span className="text-[10px] sm:text-xs text-white/90 font-medium tracking-wide">
              Express delivery
            </span>
          </div>

          <h2 className="text-lg sm:text-3xl font-semibold text-white leading-snug">
            Groceries at your door<br />
            in <span className="text-[#7effc0]">10 minutes</span>
          </h2>

          <p className="text-[11px] sm:text-sm text-white/75 leading-relaxed sm:block">
            Fresh produce, dairy & more — delivered faster than you can say "hungry."
          </p>

          <div className="flex items-center mt-2">
            <button className="bg-white text-[#1a7a4a] text-xs sm:text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition">
              Order now
            </button>
          </div>
        </div>

        <div className="z-10 flex-shrink-0 hidden md:block">
          <img 
            src={assets.delivery} 
            alt="delivery" 
            className="w-28 sm:w-100 object-contain" 
          />
        </div>

      </div>

    </div>
  )
}

export default Delivery_in10min