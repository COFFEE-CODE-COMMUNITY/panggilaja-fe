import React from 'react'
import Bannerr from '../../../assets/Bannerr.jpeg'

const Banner = () => {
  return (
    <div className='w-full md:h-[300px] h-[200px] rounded-[25px] cursor-pointer' style={{
        backgroundImage : `url(${Bannerr})`,
        backgroundSize : 'cover' 
    }}></div>
  )
}

export default Banner