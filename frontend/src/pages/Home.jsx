import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import Combo from '../components/Combo'
import BestSeller from '../components/BestSeller'
import Delivery_in10min from '../components/Delivery_in10min'

const Home = () => {
  return (
    <div className='sm:mx-10 sm:mt-5'>
      <HeroSection />
      <BestSeller />
      <Delivery_in10min />
      <Combo />
    </div>
  )
}

export default Home