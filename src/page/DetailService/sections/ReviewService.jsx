import React from 'react'
import ReviewCard from '../../../components/modules/Cards/ReviewCard'

const ReviewService = ({className, reviews = []}) => {
  console.log("ReviewService received reviews:", reviews);
  return (
    <div className={`flex flex-col gap-5 ${className} px-3`}>
      <p className='font-semibold'>Ulasan Warga ({reviews.length})</p>
      <div className='w-full flex flex-col gap-4'>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard 
              key={review.id}
              date={new Date(review.created_at).toLocaleDateString('id-ID')}
              name={review.buyer?.fullname || "Pengguna"}
              profileImage={review.buyer?.foto_buyer}
              rating={review.rating}
              reviewText={review.komentar}
            />
          ))
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500">Belum ada review untuk jasa ini</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReviewService