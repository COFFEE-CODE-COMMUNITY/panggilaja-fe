import React from 'react'
import Banner from './sections/Banner'
import Category from './sections/Category'
import ServiceAround from './sections/ServiceAround'
import Invitation from './sections/Invitation'
import Review from './sections/Review'
import Stars from '../../components/common/Stars'

const LandingPage = () => {
  return (
    <div className='xl:px-[150px] lg:px-[100px] md:px-[55px] sm:px-[35px] px-[10px] py-[5px] flex flex-col lg:gap-[30px] md:gap-[20px] gap-[20px] transition-all duration-700'>
      <Banner/>
      <Category/>
      <ServiceAround/>
      <Invitation/>
      <Review/>
    </div>
  )
}

export default LandingPage