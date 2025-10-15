import React from 'react'
import { FaStar } from 'react-icons/fa'

const InformationService = ({name, title, totalReview, rangePrice, description, review, overalRating, allTotalReview}) => {
  return (
    <div className='lg:min-h-screen h-1/2 lg:w-1/2 w-full flex flex-col px-[35px] py-[25px] bg-amber-100'>
        <div className='flex flex-col gap-[5px]'>
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
            <h2 className='text-h3'>{rangePrice}</h2>
            <p className='text-h5 font-light'>
                {description}
            </p>
            <div className='flex'>
                <img className='bg-amber-500 w-[40px] h-[40px] rounded-full' />
                <div>
                    <p>{name}</p>
                    <div className='flex items-center'>
                        <FaStar className='text-star lg:text-[10px] md:text-[7px] text-[4px]'/>
                        <p>{overalRating}</p>
                        <p>{allTotalReview} rating</p>
                    </div>

                </div>
            </div>
        </div>
        <div></div>
    </div>
  )
}

export default InformationService