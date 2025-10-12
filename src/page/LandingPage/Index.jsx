import React from 'react'
import Banner from './sections/Banner'
import Category from './sections/Category'
import ServiceAround from './sections/ServiceAround'
import Invitation from './sections/Invitation'
import Review from './sections/Review'

const LandingPage = () => {
  return (
    <div className='lg:px-[50px] px-[20px] py-[30px] flex flex-col lg:gap-[40px] gap-[25px]'>
      <Banner/>
      <Category/>
      <ServiceAround/>
      <Invitation/>
      <Review/>
    </div>
  )
}

export default LandingPage