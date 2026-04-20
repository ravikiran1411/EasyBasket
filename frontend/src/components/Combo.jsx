
import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../context/DataContext'
import ProductList from './ProductList';
import { assets } from '../assets/assets';
import {NavLink} from 'react-router-dom'
const Combo = () => {

    const {products} = useContext(DataContext);
    const [combo,setCombo] = useState([])

    const comboOffer = () =>{
        const comboproducts = products.filter((item)=>item.category=="combo")
        setCombo(comboproducts.slice(0,5));
    }

    useEffect(()=>{
        comboOffer();
    },[products])


  return (
    <div className='mt-5 sm:mt-15 p-5 bg-slate-50 rounded-2xl'>
        <div className='text-black font-medium flex gap-2 items-center justify-between'>
            <div className='flex items-center gap-2'>
                <p id='header' className='text-2xl sm:text-4xl'>COMBO OFFERS</p>
                <p className='w-8 sm:w-12 h-0.5 bg-green-700'></p>
            </div>
            
            <NavLink to="/" className="flex items-center gap-2">
            <button className="hidden sm:block text-base sm:text-lg font-medium text-green-500 hover:text-green-600 transition">View All</button>
            <img
            className="w-4 h-4 mt-1"
            src={assets.viewAll}
            alt="view all"
            />
            </NavLink>

        </div>
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3 pb-10 lg:grid-cols-5 pt-7'>
          {
                combo.map((item,index)=>(
                <ProductList key={index} image={item.image} id={item._id} name={item.name} price={item.price}  />
              ))
           }
           </div>
    </div>
  )
}

export default Combo