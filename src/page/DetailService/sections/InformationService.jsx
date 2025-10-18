import React from 'react'
import { FaStar } from 'react-icons/fa'
import Button from '../../../components/common/Button'
import Card from '../../../components/common/Card'
import ReviewCard from '../../../components/modules/Cards/ReviewCard'
import { Link } from 'react-router-dom'

const InformationService = ({id, name, title, totalReview, rangePrice, description, review, overalRating, allTotalReview}) => {
  return (
    <div className='lg:min-h-screen h-1/2 lg:w-1/2 w-full flex flex-col lg:px-[35px] lg:py-[25px] md:px-[30px] md:py-[20px] px-[15px] py-[10px]'>
        <div className='flex flex-col gap-[5px]'>
            <div className='flex flex-col gap-[5px]'>
                <div className='flex flex-col leading-8'>
                    <Link to={`/profile-service/${id}`}>
                        <p className='text-h5 font-light cursor-pointer'>{name}</p>
                    </Link>
                    <h2 className='text-h2'>{title}</h2>
                </div>
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
            </div>
            <div className='flex gap-[15px] w-full flex-col lg:flex-row'>
                <div className='flex gap-[10px]'>
                    <img className='bg-amber-500 w-[40px] h-[40px] rounded-full' />
                    <div>
                        <p>{name}</p>
                        <div className='flex items-center gap-[5px]'>
                            <FaStar className='text-star lg:text-[15px] md:text-[13px] text-[10px]'/>
                            <p>{overalRating}</p>
                            <p className='text-h6 font-light'>{allTotalReview} ulasan</p>
                        </div>

                    </div>
                </div>
                <div className='flex flex-1 gap-[10px]'>
                    <Button variant='primary' className='flex-1 rounded-[20px] text-white font-medium h-[50px] flex items-center justify-center'>
                        Hubungi sekarang
                    </Button>
                    <div className='h-[50px] w-[50px] rounded-full border-1 border-gray-500'></div>
                </div>
            </div>
        </div>
        <div className='flex flex-col'>
            <p className='text-h3 font-medium'>Ulasan warga</p>
            <div className='flex flex-col gap-[5px]'>
                {review.map((review) => (
                    <ReviewCard
                        date={review.date}
                        name={review.reviewer_name}
                        reviewText={review.comment}
                        rating={review.rating}
                        key={review.id}
                    />
                ))}
            </div>
        </div>
    </div>
  )
}

export default InformationService