import React, { useEffect } from 'react'
import ReviewCard from '../../components/modules/Cards/ReviewCard'
import { useGetReviewsBySellerId } from '../../hooks/useReviews'
import { MessageSquare } from 'lucide-react'
import { useParams } from 'react-router-dom'

const ProfileReviews = () => {
  const { id } = useParams()

  const { data: reviewsResponse, status: reviewsQueryStatus } = useGetReviewsBySellerId(id);
  const reviews = reviewsResponse?.data || reviewsResponse || [];
  const status = reviewsQueryStatus === 'pending' ? 'loading' : reviewsQueryStatus;


  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className='min-h-screen py-6'>
      <div className='flex flex-col gap-4'>
        {reviews?.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard
              key={review.id}
              date={new Date(review.created_at).toLocaleDateString('id-ID')}
              name={review.buyer?.fullname || "Pengguna"}
              profileImage={review.buyer?.foto_buyer}
              rating={review.rating}
              reviewText={review.komentar}
              serviceName={review.service?.nama_jasa}
              serviceImage={review.service?.foto_product}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="bg-white p-3 rounded-full shadow-sm mb-3">
              <MessageSquare className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">Belum ada ulasan</p>
            <p className="text-gray-400 text-sm mt-1">Mitra ini belum memiliki ulasan.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileReviews