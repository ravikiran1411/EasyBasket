import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import Combo from '../components/Combo'
import BestSeller from '../components/BestSeller'
import Delivery_in10min from '../components/Delivery_in10min'
import ShopByCategory from '../components/ShopByCategory'
import WhyEasyBasket from '../components/WhyEasyBasket'

const Home = () => {
  return (
    <div className='sm:mx-10 sm:mt-5'>
      <HeroSection />
      <ShopByCategory />
      <BestSeller />
      <Delivery_in10min />
      <Combo />
      <WhyEasyBasket/>
    </div>
  )
}

export default Home