import React from 'react'
import { TestimonialData } from '../../../dummy/TestimonialData'
import Card from '../../../components/common/Card'
import { FaStar } from 'react-icons/fa'

const Review = () => {
  return (
    <div className='w-full flex flex-col gap-[15px]'>
        <h2 className='xl:text-h4 text-h5 font-semibold'>Apa kata konsumen</h2>
        <div className='grid xl:grid-cols-5 grid-cols-3 gap-[10px]'>
            {TestimonialData.map((review) => (
                <Card className='w-full lg:px-[30px] md:px-[20px] px-[15px] py-[20px] flex flex-col gap-[10px] rounded-[25px] border-2 border-gray-100 relative' key={review.id}>
                    <p className='md:text-h5 text-h6'>{review.author}</p>
                    <p className='md:text-h5 text-h6 font-light h-full'>{review.review}</p>
                    <div className='flex gap-[5px]'>
                        <FaStar className='text-star lg:text-[20px] md:text-[15px] text-[10px]'/>
                        <FaStar className='text-star lg:text-[20px] md:text-[15px] text-[10px]'/>
                        <FaStar className='text-star lg:text-[20px] md:text-[15px] text-[10px]'/>
                        <FaStar className='text-star lg:text-[20px] md:text-[15px] text-[10px]'/>
                        <FaStar className='text-star lg:text-[20px] md:text-[15px] text-[10px]'/>
                    </div>
                </Card>
            ))}
        </div>
    </div>
  )
}

export default Review