import React from 'react'
import Card from '../../common/Card'
import Stars from '../../common/Stars'

const ReviewCard = ({ profileImage, name, date, rating, reviewText, serviceName, serviceImage }) => {

    return (
        <Card to={false} className='flex lg:gap-5 md:gap-4 gap-3 bg-gray-50/40 py-3 rounded-xl'>
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

                {/* Service Information */}
                {serviceName && (
                    <div className="mt-3 flex items-center gap-3 bg-white p-2 rounded-lg border border-gray-100/50">
                        <img
                            src={serviceImage || "/default-service.png"}
                            alt={serviceName}
                            className="w-10 h-10 rounded-md object-cover bg-gray-100"
                        />
                        <p className="text-sm font-medium text-gray-700 clamp-1">
                            {serviceName}
                        </p>
                    </div>
                )}
            </div>
        </Card>
    )
}

export default ReviewCard