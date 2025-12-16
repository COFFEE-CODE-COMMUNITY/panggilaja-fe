import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Banner from './sections/Banner'
import Category from './sections/Category'
import ServiceAround from './sections/ServiceAround'
import Invitation from './sections/Invitation'
import Review from './sections/Review'
import Stars from '../../components/common/Stars'
import Faq from './sections/Faq'
import ModalSwitchAccount from '../../components/modules/Modal/ModalSwitchAccount'
import { selectChangeAccountStatus } from '../../features/authSlice'

const LandingPageSkeleton = () => {
  return (
    <div className='xl:px-[150px] lg:px-[100px] md:px-[55px] sm:px-[35px] px-[10px] py-[5px] flex flex-col lg:gap-[30px] md:gap-[20px] gap-[20px] animate-pulse'>
      {/* Banner Skeleton */}
      <div className="w-full h-[300px] md:h-[400px] bg-gray-200 rounded-xl"></div>

      {/* Category Skeleton - REMOVED as requested */}
      {/* <div className="flex gap-4 overflow-x-auto pb-4">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="min-w-[100px] h-[100px] bg-gray-200 rounded-lg"></div>
        ))}
      </div> */}

      {/* Service Around Skeleton */}
      <div className="space-y-4">
        <div className="h-8 w-1/3 bg-gray-200 rounded"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-[250px] bg-gray-200 rounded-xl"></div>
          ))}
        </div>
      </div>

      {/* Invitation Skeleton */}
      <div className="w-full h-[200px] bg-gray-200 rounded-xl"></div>
    </div>
  )
}

const LandingPage = () => {
  const [modal, setModal] = useState(false)
  const changeAccountStatus = useSelector(selectChangeAccountStatus);

  if (changeAccountStatus === 'loading') {
    return <LandingPageSkeleton />
  }

  return (
    <>
      <div className='xl:px-[150px] lg:px-[100px] md:px-[55px] sm:px-[35px] px-[10px] py-[5px] flex flex-col lg:gap-[30px] md:gap-[20px] gap-[20px] transition-all duration-700'>
        <Banner />
        <Category />
        <ServiceAround />
        <Invitation />
        <Review />
        <Faq />
      </div>
    </>
  )
}

export default LandingPage