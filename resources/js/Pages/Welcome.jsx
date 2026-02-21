import CatalogSection from '@/Components/AppComponents/Catalog'
import Footer from '@/Components/AppComponents/Footer'
import Hero from '@/Components/AppComponents/Hero'
import Navbar from '@/Components/AppComponents/Navbar'
import React from 'react'

const Welcome = ({ categories }) => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <CatalogSection categories={categories} />
      <Footer/>
    </div>
  )
}

export default Welcome
