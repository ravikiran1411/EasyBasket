import React, { useContext } from 'react'
import {useLocation} from 'react-router-dom'
import { DataContext } from '../context/DataContext'
import ProductList from '../components/ProductList'

const Category = () => {

  const {products} = useContext(DataContext);

  const location = useLocation() 
  const params = new URLSearchParams(location.search) 
  const category = params.get("category") 

  const filterProduct = category ? products.filter((item)=>item.category.toLowerCase()==category.toLowerCase()) : products

  return (
    <div className="p-4 mx-5 flex ">

      <div className='min-w-1/4'>
      <h1>filters</h1>
      </div>

      <div className=''>
        <div>
          <h2 className="text-xl font-semibold mb-6">{category ? category.toUpperCase()  : "All Products"}</h2>

        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {filterProduct.length >0 ? filterProduct.map((item) => (
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