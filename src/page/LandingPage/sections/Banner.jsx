import React from 'react'
import Bannerr from '../../../assets/Bannerr.jpeg'

const Banner = () => {
  return (
    <div className='bg-green-400 w-full md:h-[514px] h-[300px] rounded-[45px]' style={{
        backgroundImage : `url(${Bannerr})`,
        backgroundSize : 'cover' 
    }}></div>
  )
}

export default Banner