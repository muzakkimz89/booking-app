import React from 'react'
import Featured from '../components/Featured'
import FeaturedProperties from '../components/FeaturedProperties'
import Footer from '../components/Footer'
import Header from '../components/Header'
import MailList from '../components/MailList'
import Navbar from '../components/Navbar'
import PropertyList from '../components/PropertyList'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured/>       
        <PropertyList/>       
        <FeaturedProperties/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  )
}

export default Home