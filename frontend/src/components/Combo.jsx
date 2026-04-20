
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
        
        <div className='text-black font-medium flex gap-2 items-center justify-center'>
                <span className='w-8 sm:w-12 h-0.5 bg-green-700'></span>            

                <p id='header' className='text-2xl sm:text-4xl text-center'>COMBO OFFERS</p>
                <span className='w-8 sm:w-12 h-0.5 bg-green-700'></span>            
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-4 gap-2 md:gap-3 pb-10 lg:grid-cols-5 pt-7'>
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