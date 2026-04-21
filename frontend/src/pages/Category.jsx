import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../context/DataContext'
import ProductList from '../components/ProductList'
import { assets } from '../assets/assets'
import Delivery_in10min from '../components/Delivery_in10min'
import { useLocation, useNavigate } from 'react-router-dom'

const Category = () => {

  const navigate = useNavigate();
  const {products,currency} = useContext(DataContext);
  const [showFilter,setShowFilter] =useState(false);
  const [priceRange,setPriceRange] = useState('');
  const [product,setProduct] = useState([])
  const [sortType,setSortType] = useState("")

  const location = useLocation() 
  const params = new URLSearchParams(location.search) 
  const category = params.get("category") 

  const productData = async () =>{
    
    const filterProduct = category ? products.filter((item)=>item.category.toLowerCase()==category.toLowerCase()) : products

    let pcopy=filterProduct.slice()

    if(priceRange!=='') {
      if(priceRange ==='0-100' ) {
        pcopy=pcopy.filter(p=>p.price<101)
      }
      else if(priceRange==='101-200') {
        pcopy=pcopy.filter(p=>p.price>100 && p.price<201)
      }
      else if(priceRange === '201-300') {
        pcopy=pcopy.filter(p=>p.price> 200 && p.price<301)
      }
      else{
        pcopy=pcopy.filter(p=>p.price>300)
      }
    }

    if(sortType==="low-high") {
      pcopy.sort((a,b)=>a.price-b.price)
    }
    else if(sortType==="high-low") {
      pcopy.sort((a,b)=>b.price-a.price)
    }
    else if(sortType === "best") {
      pcopy=pcopy.filter((item)=>item.bestSeller)
    }
    
    setProduct(pcopy)

  }

  useEffect(()=>{
    productData()
  },[priceRange,products,category,sortType])

  

  return (
    <div className="p-4 sm:mx-5 flex flex-col md:flex-row md:gap-8"> 

        <div className='sm:min-w-1/4 h-fit sm:sticky sm:top-20 '> 
         <p className='text-xl my-3 flex items-center gap-2  ' onClick={()=>setShowFilter(!showFilter)}>Filters
          <img src={assets.dropdown_icon} className={`sm:hidden w-3 h-4 ${showFilter ? ' rotate-90':''}  `}/>
        </p>
        <div className={`sm:px-10 w-full rounded-md border border-slate-300 bg-slate-100 sm:block pl-5 py-5 mt-6 ${showFilter ? '': 'hidden' } `}>
          <p className='text-lg font-medium mb-3'>Price Range</p>
          <div className='flex flex-col gap-2 text-sm font-light'>
            <p className='flex gap-2'>
              <input type='radio' value='0-100' name='price' onChange={(e)=>setPriceRange(e.target.value)} /> {currency}0-{currency}100
            </p>
              <p className='flex gap-2'>
              <input type='radio' value='101-200' name='price' onChange={(e)=>setPriceRange(e.target.value)} />{currency}101-{currency}200
            </p>
              <p className='flex gap-2'>
              <input type='radio' value='201-300' name='price' onChange={(e)=>setPriceRange(e.target.value)} />{currency}201-{currency}300
            </p>
             <p className='flex gap-2'>
              <input type='radio' value='above300' name='price' onChange={(e)=>setPriceRange(e.target.value)} />Above {currency}300
            </p>
          </div>
        </div>

        <div  className="hidden sm:block flex-col gap-4 mt-6 bg-gradient-to-r from-green-100 to-green-50 border border-green-300 rounded-xl p-4 cursor-pointer hover:shadow-md transition">
          <div className='flex gap-5'> 
            <div>
              <p className="text-[10px] font-semibold text-green-700 bg-green-200 w-fit px-2 py-0.5 rounded-full mb-2">LIMITED OFFER</p>
              <p className="text-sm font-semibold text-gray-800 leading-tight">15 min delivery on combos</p>
              <p className="text-xs text-gray-600 mt-1">Save more on combo packs </p>
            </div>
            <div className='flex items-end'>
              <img src={assets.category8} className='w-fit h-22' />
            </div>
          </div>
          <button onClick={() => navigate("/product?category=combo")} className="mt-2 bg-green-600 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-green-700 transition">
            Shop Now 
          </button>
          
        </div>

      </div>
 

      <div className=''>
        <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-row items-center gap-1 sm:gap-3">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">{category ? category.toUpperCase() : "All Products"}</h2>
            <span className="text-xs sm:text-sm text-gray-500">(Total {product.length} items)</span>
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-sm text-gray-500 hidden sm:block">Sort:</span>
            <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="w-full sm:w-[180px] border border-gray-200 bg-white px-3 py-2 rounded-lg text-sm outline-none shadow-sm hover:border-green-500 focus:border-green-500 transition cursor-pointer"
            >
              <option value="">Default</option>
              <option value="low-high">Price: Low → High</option>
              <option value="high-low">Price: High → Low</option>
              <option value="best">Best Sellers</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {product.length >0 ? product.map((item) => (
          <ProductList
            key={item._id}
            image={item.image}
            id={item._id}
            name={item.name}
            price={item.price}
            category={item.category}
            brand={item.brand}
            quantity={item.quantity}
            bestSeller={item.bestSeller}
          />
          )) : <div> 
             <h1 id='header' className='text-2xl text-center'>No Products Available.</h1>
          </div> }
        </div>
      </div>

    </div>
  )
}

export default Category