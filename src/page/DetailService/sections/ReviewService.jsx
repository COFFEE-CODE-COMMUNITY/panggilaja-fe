import React from 'react'
import ReviewCard from '../../../components/modules/Cards/ReviewCard'
import { MessageSquare } from 'lucide-react'

const ReviewService = ({ className, reviews = [] }) => {
  return (
    <div className={`flex flex-col gap-5 ${className} px-3`}>
      <p className='font-semibold mb-2'>Ulasan Warga ({reviews.length})</p>
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
          <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
            <div className="bg-white p-3 rounded-full shadow-sm mb-3">
              <MessageSquare className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">Belum ada ulasan</p>
            <p className="text-gray-400 text-sm mt-1">Jadilah yang pertama memberikan ulasan!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReviewService