import React from 'react'
import Banner from './sections/Banner'
import Category from './sections/Category'
import ServiceAround from './sections/ServiceAround'
import Invitation from './sections/Invitation'
import Review from './sections/Review'

const LandingPage = () => {
  return (
    <div className='xl:px-[150px] lg:px-[100px] md:px-[55px] px-[10px] lg:py-[15px] md:py[10px] py-[5px] flex flex-col lg:gap-[30px] md:gap-[20px] gap-[10px] transition-all duration-700'>
      <Banner/>
      <Category/>
      <ServiceAround/>
      <Invitation/>
      <Review/>
    </div>
  )
}

export default LandingPage