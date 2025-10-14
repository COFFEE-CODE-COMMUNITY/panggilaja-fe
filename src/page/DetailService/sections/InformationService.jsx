import React from 'react'
import { FaStar } from 'react-icons/fa'

const InformationService = ({name, title, totalReview, rangePrice, description, review}) => {
  return (
    <div className='lg:min-h-screen h-1/2 lg:w-1/2 w-full flex flex-col'>
        <div>
            <p className='text-h5'>{name}</p>
            <h2 className='text-h2'>{title}</h2>
            <div className='flex items-center gap-[5px]'>
                <div className='flex gap-[5px]'>
                    <FaStar className='text-star lg:text-[20px] md:text-[15px] text-[10px]'/>
                    <FaStar className='text-star lg:text-[20px] md:text-[15px] text-[10px]'/>
                    <FaStar className='text-star lg:text-[20px] md:text-[15px] text-[10px]'/>
                    <FaStar className='text-star lg:text-[20px] md:text-[15px] text-[10px]'/>
                    <FaStar className='text-star lg:text-[20px] md:text-[15px] text-[10px]'/>
                </div>
                <p className='text-h5 font-light'>{totalReview} ulasan</p>
            </div>
            <p className='text-h5 font-light'>
                {description}
            </p>
            <div>

            </div>
        </div>
        <div></div>
    </div>
  )
}

export default InformationService