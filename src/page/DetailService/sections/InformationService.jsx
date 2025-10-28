import React, { useEffect } from 'react'
import { FaStar, FaRegHeart } from 'react-icons/fa'
import Button from '../../../components/common/Button'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addFavoriteService, getFavoriteService, getReviewServicesById, selectAddFavoriteServiceError, selectAddFavoriteServiceStatus, selectFavoriteService, selectReviewService, selectReviewServiceStatus } from '../../../features/serviceSlice'
import { selectCurrentUser } from '../../../features/authSlice'

const InformationService = ({sellerName, idProvider,  idService, nameService, totalReview, topPrice, basePrice, description, totalReviewSeller, }) => {
    const dispatch = useDispatch()
    const reviews = useSelector(selectReviewService)
    const status = useSelector(selectReviewServiceStatus)

    const user = useSelector(selectCurrentUser)

    const statusAdd = useSelector(selectAddFavoriteServiceStatus)
    const errorAdd = useSelector(selectAddFavoriteServiceError)

    const getFavorites = useSelector(selectFavoriteService)

    useEffect(() => {
        if(user.id_buyer){
            dispatch(getFavoriteService(user.id_buyer))
        }
    },[dispatch])

    console.log(getFavoriteService)

    useEffect(() => {
        if(idProvider){
            dispatch(getReviewServicesById(idProvider))
        }
    },[dispatch, idProvider])

    console.log(statusAdd)

    const handleAddFavorite = () => {
        dispatch(addFavoriteService(idService));
    };


  return (
    <div className='lg:h-full h-1/2 lg:w-1/2 w-full flex flex-col gap-[30px] lg:px-[35px] lg:py-[25px] md:px-[30px] md:py-[20px] px-[15px] py-[10px]'>
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
                    <div className='flex gap-[5px] w-full'>
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
                    </div>
                    <Button 
                        className='h-[50px] w-[50px] aspect-square rounded-full border-1 border-gray-500 flex justify-center items-center'
                        onClick={handleAddFavorite}
                    >
                        <FaRegHeart className='text-gray-500 text-2xl'/>
                    </Button>
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