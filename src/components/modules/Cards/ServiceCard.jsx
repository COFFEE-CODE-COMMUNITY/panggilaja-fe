import React, { useEffect } from 'react'
import Card from '../../common/Card'
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Stars from '../../common/Stars'
import { useDispatch, useSelector } from 'react-redux'
import { addFavoriteService, deleteFavoriteService, getFavoriteService, resetAddFavoritesStatus, selectAddFavoriteServiceStatus, selectFavoriteService } from '../../../features/serviceSlice'
import { selectAccessToken, selectCurrentUser } from '../../../features/authSlice'

const ServiceCard = ({image, idService, serviceName, basePrice, topPrice, sellerName, star, desc }) => {
    const favoritesService = useSelector(selectFavoriteService)
    const user = useSelector(selectCurrentUser)
    const dispatch = useDispatch()

    const token = useSelector(selectAccessToken)

    const favorite = favoritesService?.data.find((favorite) => favorite.service_id === idService)

    const statusAdd = useSelector(selectAddFavoriteServiceStatus)

    useEffect(() => {
        if (statusAdd === 'success') {            
            if (user?.id) {
                dispatch(getFavoriteService(user.id))
            }
            dispatch(resetAddFavoritesStatus())
        } 
    }, [statusAdd, dispatch, user?.id]);

  return (
    <Card 
        className='group hover:scale-101 transition-all duration-200 relative block overflow-hidden rounded-lg'
        to={false}
    >
        {token ? 
            !favorite ? (
                <button 
                    className="absolute end-4 top-4 z-5 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75 cursor-pointer"
                    onClick={() => dispatch(addFavoriteService(idService))}
                >
                    <FaRegHeart 
                        className='text-gray-600'
                    />
                </button>
            ) : (
                <button 
                    className="absolute end-4 top-4 z-5 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75 cursor-pointer"
                    onClick={() => dispatch(deleteFavoriteService(favorite.id))}
                >
                    <FaHeart 
                        className='text-gray-600'
                    />
                </button>
            )
        : ''}

        <img 
            src={image} 
            alt="" 
            className="h-64 w-full object-cover transition duration-500 sm:h-72 relative z-0" 
        />

        <div className="relative border border-gray-100 bg-white lg:p-4 md:p-3 p-2 flex flex-col gap-2">
            <Link to={`/service/${idService}`} className="mt-1.5 font-medium text-gray-900 text-h5">{serviceName}</Link >

            <Stars 
                many={4} 
                variant='star'
            />   

            <p className="text-gray-700 md:text-h5 text-h6">
                Rp {basePrice} - {topPrice}
            </p>

            
        </div>
    </Card>
  )
}

export default ServiceCard