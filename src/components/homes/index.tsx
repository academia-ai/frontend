import React from 'react'
import { Navbar } from '../reuseable/navbar'
import  Footer  from '../reuseable/footer'
import Features  from './features.jsx'
import Testimonials from './testimonials'
// import Pricing from './pricing'
import FAQ from './faq'
import Hero from './hero'
import HowItWorks from './howItWorks.jsx'


const HomeIndex = () => {
  return (

       <div className="min-h-screen bg-slate-950 relative ">
      <Navbar />
      <h1>HomeIndex</h1>
      <main>
        <Hero />
    
    
         <Features />
      <HowItWorks  />
        <Testimonials />
        {/* <Pricing /> */}
        <FAQ/> 
      </main>
      <Footer />
    


    </div>
  )
}

export default HomeIndex
