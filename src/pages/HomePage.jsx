import React from 'react'
import HeroSection from '../components/Home/HeroSection'
import FeaturesBar from '../components/Home/FeaturesBar'
import PromoBanner from '../components/Home/PromoBanner'
import BestSellers from '../components/Home/BestSellers'
import Categories from '../components/Home/Categories'
import NewArrivals from '../components/Home/NewArrivals'
import BottomFeatures from '../components/Home/BottomFeatures'

function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturesBar />
      <PromoBanner />
      <BestSellers />
      <Categories />
      <NewArrivals />
      <BottomFeatures />
    </div>
  )
}

export default HomePage