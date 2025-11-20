import React from 'react'
import Card from '../../common/Card'
import Stars from '../../common/Stars'

const ReviewCard = ({profileImage, name, date, rating, reviewText}) => {

    return (
    <Card className='flex lg:gap-5 md:gap-4 gap-3 bg-gray-50/40 py-3 rounded-xl'>
        <div>
            <img 
                src={profileImage || "/default-avatar.png"} 
                className='lg:w-20 md:w-30 w-40 aspect-square rounded-full bg-gray-200 object-cover'
            />
        </div>
        <div className='flex flex-col lg:gap-3 md:gap-2 gap-1 w-full'>
            <div>
                <p className='font-semibold'>{name}</p>
                <p className='font-light text-sm text-gray-500'>{date}</p>
            </div>
            <Stars
                many={rating}
                variant='star'
            />
            <p className='font-light text-gray-700'>
                {reviewText}
            </p>
        </div>
    </Card>
  )
}

export default ReviewCard