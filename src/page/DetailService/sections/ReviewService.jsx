import React from 'react'
import ReviewCard from '../../../components/modules/Cards/ReviewCard'

const ReviewService = () => {
  return (
    <div className='flex flex-col gap-5'>
      <p>Ulasan Warga</p>
      <div className='w-full'>
        <ReviewCard
          date='29-09-2025'
          name='asep'
          rating='5'
          reviewText='loremdawddddddddddddddd'
        />
      </div>
    </div>
  )
}

export default ReviewService