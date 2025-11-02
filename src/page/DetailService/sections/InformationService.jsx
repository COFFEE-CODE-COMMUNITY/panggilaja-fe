import React, { useEffect } from 'react'
import { FaStar, FaRegHeart, FaHeart } from 'react-icons/fa'
import Button from '../../../components/common/Button'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addFavoriteService, deleteFavoriteService, getFavoriteService, getReviewServicesById, resetAddFavoritesStatus, resetDeleteFavoritesStatus, selectAddFavoriteServiceError, selectAddFavoriteServiceStatus, selectDeleteFavoriteServiceError, selectDeleteFavoriteServiceStatus, selectFavoriteService, selectReviewService, selectReviewServiceStatus } from '../../../features/serviceSlice'
import { selectCurrentUser } from '../../../features/authSlice'

const InformationService = ({sellerName, idProvider,  idService, nameService, totalReview, topPrice, basePrice, description, totalReviewSeller, }) => {
    const dispatch = useDispatch()
    const reviews = useSelector(selectReviewService)
    const status = useSelector(selectReviewServiceStatus)

    const statusFavorite = useSelector(selectAddFavoriteServiceStatus)
    const messageFavorite = useSelector(selectAddFavoriteServiceError)

    const user = useSelector(selectCurrentUser)

    const statusAdd = useSelector(selectAddFavoriteServiceStatus)
    const errorAdd = useSelector(selectAddFavoriteServiceError)

    const favorites = useSelector(selectFavoriteService)

    useEffect(() => {
        if(idProvider){
            dispatch(getReviewServicesById(idProvider))
        }
    },[dispatch, idProvider])

    const handleAddFavorite = () => {
        dispatch(addFavoriteService(idService));
    };

    useEffect(() => {
        if (statusAdd === 'success') {            
            if (user?.id) {
                dispatch(getFavoriteService(user.id))
            }
            dispatch(resetAddFavoritesStatus())
        } 
    }, [statusAdd, errorAdd, dispatch, user?.id]);

    let isServiceFavorite = favorites?.data?.find((favorite) => favorite.service_id === idService)

    const deleteFavoriteStatus = useSelector(selectDeleteFavoriteServiceStatus)
    const deleteFavoriteMessage = useSelector(selectDeleteFavoriteServiceError)

    useEffect(() => {
        if (deleteFavoriteStatus === 'success') {            
            if (user?.id) {
                dispatch(getFavoriteService(user.id))
            }
            dispatch(resetDeleteFavoritesStatus())
        } 
    }, [deleteFavoriteStatus, deleteFavoriteMessage, dispatch, user?.id]);

    console.log(deleteFavoriteMessage)
    console.log(deleteFavoriteStatus)

  return (
    <div className='lg:h-full h-1/2 lg:w-[45%] w-full flex flex-col gap-[30px] lg:py-[25px] py-[10px] px-[15px]'>
        <div className='flex flex-col gap-[10px]'>
            <div className='flex flex-col gap-[10px]'>
                <div className='flex flex-col leading-8'>
                    <Link to={`/profile-service/${idProvider}`}>
                        <p className='text-h5 font-light cursor-pointer'>asep</p>
                    </Link>
                    <h2 className='text-h2'>{nameService}</h2>
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
                <h2 className='text-h3'>Rp. {basePrice} - {topPrice}</h2>
                <p className='text-h5 font-light'>
                    {description}
                </p>
            </div>
            <div className='flex gap-[15px] w-full flex-col lg:flex-row'>
                <div className='flex gap-[10px]'>
                    <img className='bg-amber-500 w-[40px] h-[40px] rounded-full' />
                    <div>
                        <div className='flex items-center gap-[5px]'>
                            <FaStar className='text-star lg:text-[15px] md:text-[13px] text-[10px]'/>
                            <p>{totalReviewSeller}</p>
                            <p className='text-h6 font-light'>{totalReviewSeller} ulasan</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-1 gap-[10px]'>
                <div className='w-full flex gap-[10px]'>
                    <Link to={`/chat`} className='w-full'>
                        <Button variant='primary' className='flex-2 rounded-[35px] text-white font-medium h-[50px] flex items-center justify-center w-full '>
                            Hubungi sekarang
                        </Button>
                    </Link>
                    <Link to={`/chat`}>
                        <Button variant='secondary' className='flex-1 rounded-[35px] text-white font-medium h-[50px] flex items-center justify-center w-[150px] px-[10px]'>
                            Negoin aja
                        </Button>
                    </Link>
                    {isServiceFavorite ? (
                        <Button 
                            className='h-[50px] w-[50px] aspect-square rounded-full border-1 border-gray-500 flex justify-center items-center'
                            onClick={() => dispatch(deleteFavoriteService(isServiceFavorite.id))}
                        >
                            <FaHeart 
                                className={`text-red-500 text-[20px]`}
                            />
                        </Button>
                    ) : (
                        <Button 
                            className='h-[50px] w-[50px] aspect-square rounded-full border-1 border-gray-500 flex justify-center items-center'
                            onClick={handleAddFavorite}
                        >
                            <FaRegHeart className={`text-gray-300 text-[20px]`}/>
                        </Button>
                    )}
                </div>
            </div>
        </div>
        <div className='flex flex-col'>
            <p className='text-h3 font-medium'>Ulasan warga</p>
            <div>

            </div>
        </div>
    </div>
  )
}

export default InformationService