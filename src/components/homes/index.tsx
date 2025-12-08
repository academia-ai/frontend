import React from 'react'
import { Navbar } from '../reuseable/navbar'
import { Footer } from '../reuseable/footer'
import { Hero } from './hero'
import { ResumeAnalyzer } from './resumeAnalyzer'
import { Features } from './features'
import Testimonials from './testimonials'
import Pricing from './pricing'
import FAQ from './faq'
import SocialProof from './socilaProf'


const HomeIndex = () => {
  return (

       <div className="min-h-screen bg-slate-950 relative ">
      <Navbar />
      <h1>HomeIndex</h1>
      <main>
        <Hero />
         <SocialProof/>
        {/* <HowItWorks />  */}
         <Features />
        <ResumeAnalyzer/>
        <Testimonials />
        <Pricing />
        <FAQ/> 
      </main>
      <Footer />
    


    </div>
  )
}

export default HomeIndex
