import React, { useEffect, useState } from 'react'
import { FaStar, FaRegHeart, FaHeart, FaRegSave, FaSave, FaBookmark, FaRegBookmark } from 'react-icons/fa'
import Button from '../../../components/common/Button'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addFavoriteService, deleteFavoriteService, getFavoriteService, getReviewServicesById, resetAddFavoritesStatus, resetDeleteFavoritesStatus, selectAddFavoriteServiceError, selectAddFavoriteServiceStatus, selectDeleteFavoriteServiceError, selectDeleteFavoriteServiceStatus, selectFavoriteService, selectReviewService, selectReviewServiceStatus } from '../../../features/serviceSlice'
import { selectAccessToken, selectCurrentUser } from '../../../features/authSlice'
import Stars from '../../../components/common/Stars'
import { MdSave } from 'react-icons/md'
import { FiSave } from 'react-icons/fi'
import { IoSaveSharp } from 'react-icons/io5'
import { HiOutlineSave } from 'react-icons/hi'
import { getSellerById, selectSelectedSeller } from '../../../features/sellerSlice'
import FaqService from './FaqService'

const InformationService = ({idSeller, sellerName, idProvider,  idService, nameService, totalReview, topPrice, basePrice, description, totalReviewSeller, }) => {
    const dispatch = useDispatch()
    const reviews = useSelector(selectReviewService)
    const status = useSelector(selectReviewServiceStatus)

    const statusFavorite = useSelector(selectAddFavoriteServiceStatus)
    const messageFavorite = useSelector(selectAddFavoriteServiceError)

    const user = useSelector(selectCurrentUser)
    const token = useSelector(selectAccessToken)

    const statusAdd = useSelector(selectAddFavoriteServiceStatus)
    const errorAdd = useSelector(selectAddFavoriteServiceError)

    const favorites = useSelector(selectFavoriteService)

    const sellerProfile = useSelector(selectSelectedSeller)
    
    useEffect(() => {
        if(idSeller){
            dispatch(getSellerById(idSeller))
        }
    },[dispatch, idSeller])

    useEffect(() => {
        if(idProvider && token){
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

    const [showMoreDesc, setShowMoreDesc] = useState(false)

  return (
    <div className='lg:h-full h-1/2 lg:w-[45%] w-full flex flex-col gap-[30px] lg:py-[25px] md:py-[20px] py-[15px] px-[15px]'>
        <div className='flex flex-col gap-[10px]'>
            <div className='flex flex-col gap-[10px]'>
                <div className='flex flex-col leading-8'>
                    <div className='flex'>
                        <p className='flex-1 text-h5 font-light'>{sellerProfile?.nama_toko}</p>
                        {token && (
                            isServiceFavorite ? (
                                <Button 
                                    onClick={() => dispatch(deleteFavoriteService(isServiceFavorite.id))}
                                >
                                    <FaHeart className={`text-gray-700 text-xl`}
                                    />
                                </Button>
                            ) : (
                                <Button 
                                    onClick={token ? handleAddFavorite : ''}
                                >
                                    <FaRegHeart className={`text-gray-700 text-xl`}/>
                                </Button>
                            )
                        )}
                    </div>
                    <h2 className='text-h2'>{nameService}</h2>
                </div>
                <div className='flex items-center gap-[5px]'>
                    <div className='flex gap-[5px]'>
                        <Stars many={0}/>
                    </div>
                    <p className='text-h5 font-light text-primary'>{totalReview} ulasan</p>
                </div>
                <p className='text-h5 font-light my-3'>
                    {!showMoreDesc && description.slice(0,200)}{!showMoreDesc && <>
                        <span>...</span><span onClick={() => setShowMoreDesc(!showMoreDesc)} className='font-medium cursor-pointer'>selengkapnya</span>
                    </>}
                    {showMoreDesc && description}
                </p>
            </div>
            {/* <div className='flex gap-[15px] w-full flex-col lg:flex-row'>
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
            </div> */}
            <div className='flex w-full'>
                <div className='flex-1'>
                    <p className='w-full border-b-1 border-gray-400'>Harga Dasar</p>
                    <p className='lg:text-h2 text-h3 font-medium py-2'>Rp {basePrice}</p>
                </div>
                <div className='flex-1'>
                    <p className='w-full border-b-1 border-gray-400'>Harga Tertinggi</p>
                    <p className='lg:text-h2 text-h3 font-medium py-2'>Rp {topPrice}</p>
                </div>
            </div>
            {/* <h2 className='text-h3'>Rp. {basePrice} - {topPrice}</h2> */}
            <div className='flex flex-1'>
                <div className='w-full flex gap-1.5'>
                    <Link to={`/chat`} className='w-full'>
                        <Button variant='primary' className='flex-2 rounded-xl text-white font-medium h-[50px] flex items-center justify-center w-full '>
                            Hubungi sekarang
                        </Button>
                    </Link>
                    <Link to={`/chat`} className='w-full'>
                        <Button variant='secondary' className='flex-1 rounded-xl text-white font-medium h-[50px] flex items-center justify-center w-full px-[10px]'>
                            Negoin aja
                        </Button>
                    </Link>
                    {/* {isServiceFavorite ? (
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
                            onClick={token ? handleAddFavorite : ''}
                        >
                            <FaRegHeart className={`text-gray-300 text-[20px]`}/>
                        </Button>
                    )} */}
                </div>
            </div>
            
            <FaqService/>
		  </div>
    </div>
  )
}

export default InformationService