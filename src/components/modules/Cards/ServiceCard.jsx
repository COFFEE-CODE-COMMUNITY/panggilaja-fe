import React, { useEffect } from 'react'
import Card from '../../common/Card'
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Stars from '../../common/Stars'
import { useDispatch, useSelector } from 'react-redux'
import { addFavoriteService, deleteFavoriteService, getFavoriteService, resetAddFavoritesStatus, selectAddFavoriteServiceStatus, selectFavoriteService } from '../../../features/serviceSlice'
import { selectCurrentUser } from '../../../features/authSlice'

const ServiceCard = ({image, idService, serviceName, basePrice, topPrice, sellerName, star, desc, guest = true }) => {
    const favoritesService = useSelector(selectFavoriteService)
    const user = useSelector(selectCurrentUser)
    const dispatch = useDispatch()

    const favorite = favoritesService?.data.find((favorite) => favorite.service_id === idService)

    const statusAdd = useSelector(selectAddFavoriteServiceStatus)

    useEffect(() => {
        if(user?.id){
            dispatch(getFavoriteService(user.id))
        }
    },[favoritesService, user?.id])

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
        className='group relative block overflow-hidden'
        to={false}
    >
        {!guest && 
            !favorite ? (
                <button 
                    className="absolute end-4 top-4 z-50 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75 cursor-pointer"
                    onClick={() => dispatch(addFavoriteService(idService))}
                >
                    <FaRegHeart 
                        className='text-gray-600'
                    />
                </button>
            ) : (
                <button 
                    className="absolute end-4 top-4 z-50 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75 cursor-pointer"
                    onClick={() => dispatch(deleteFavoriteService(favorite.id))}
                >
                    <FaHeart 
                        className='text-gray-600'
                    />
                </button>
            )
        }

        <img 
            src={image} 
            alt="" 
            className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72 relative z-0" 
        />

        <div className="relative border border-gray-100 bg-white p-6">
            <p className="text-gray-700">
                Rp {basePrice} - {topPrice}
            </p>

            <Link to={`service/${idService}`} className="mt-1.5 text-lg font-medium text-gray-900">{serviceName}</Link >

            <p className="mt-1.5 line-clamp-3 text-gray-700 mb-4">
                {desc}
            </p>
            <Stars many={4}/>   
        </div>
    </Card>
  )
}

export default ServiceCard