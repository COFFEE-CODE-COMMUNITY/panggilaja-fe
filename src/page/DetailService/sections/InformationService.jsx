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
                        <p className='flex-1 text-h5'>{sellerProfile?.nama_toko}</p>
                        {isServiceFavorite ? (
                            <Button 
                                onClick={() => dispatch(deleteFavoriteService(isServiceFavorite.id))}
                            >
                                <FaBookmark className={`text-gray-700 text-xl`}
                                />
                            </Button>
                        ) : (
                            <Button 
                                onClick={token ? handleAddFavorite : ''}
                            >
                                <FaRegBookmark className={`text-gray-700 text-xl`}/>
                            </Button>
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
                    <p className='text-h2 font-medium py-2'>Rp {basePrice}</p>
                </div>
                <div className='flex-1'>
                    <p className='w-full border-b-1 border-gray-400'>Harga Tertinggi</p>
                    <p className='text-h2 font-medium py-2'>Rp {topPrice}</p>
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
        </div>
        <div className='flex flex-col'>
            <p className='text-h5 font-medium'>Ulasan warga</p>
            <div>

            </div>
        </div>
    </div>

    // <div className="mt-4 lg:row-span-3 lg:mt-0 w-[45%]">
    //     <h2 className="sr-only">Product information</h2>
    //     <p className="text-3xl tracking-tight text-gray-900">$192</p>

    //     <div className="mt-6">
    //         <h3 className="sr-only">Reviews</h3>
    //         <div className="flex items-center">
    //         <div className="flex items-center">
    //             <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5 shrink-0 text-gray-900">
    //             <path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clip-rule="evenodd" fill-rule="evenodd" />
    //             </svg>
    //             <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5 shrink-0 text-gray-900">
    //             <path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clip-rule="evenodd" fill-rule="evenodd" />
    //             </svg>
    //             <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5 shrink-0 text-gray-900">
    //             <path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clip-rule="evenodd" fill-rule="evenodd" />
    //             </svg>
    //             <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5 shrink-0 text-gray-900">
    //             <path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clip-rule="evenodd" fill-rule="evenodd" />
    //             </svg>
    //             <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5 shrink-0 text-gray-200">
    //             <path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clip-rule="evenodd" fill-rule="evenodd" />
    //             </svg>
    //         </div>
    //         <p className="sr-only">4 out of 5 stars</p>
    //         <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">117 reviews</a>
    //         </div>
    //     </div>

    //     <form className="mt-10">
    //         <div>
    //         <h3 className="text-sm font-medium text-gray-900">Color</h3>

    //         <fieldset aria-label="Choose a color" className="mt-4">
    //             <div className="flex items-center gap-x-3">
    //             <div className="flex rounded-full outline -outline-offset-1 outline-black/10">
    //                 <input type="radio" name="color" value="white" checked aria-label="White" className="size-8 appearance-none rounded-full bg-white forced-color-adjust-none checked:outline-2 checked:outline-offset-2 checked:outline-gray-400 focus-visible:outline-3 focus-visible:outline-offset-3" />
    //             </div>
    //             <div className="flex rounded-full outline -outline-offset-1 outline-black/10">
    //                 <input type="radio" name="color" value="gray" aria-label="Gray" className="size-8 appearance-none rounded-full bg-gray-200 forced-color-adjust-none checked:outline-2 checked:outline-offset-2 checked:outline-gray-400 focus-visible:outline-3 focus-visible:outline-offset-3" />
    //             </div>
    //             <div className="flex rounded-full outline -outline-offset-1 outline-black/10">
    //                 <input type="radio" name="color" value="black" aria-label="Black" className="size-8 appearance-none rounded-full bg-gray-900 forced-color-adjust-none checked:outline-2 checked:outline-offset-2 checked:outline-gray-900 focus-visible:outline-3 focus-visible:outline-offset-3" />
    //             </div>
    //             </div>
    //         </fieldset>
    //         </div>

    //         <div className="mt-10">
    //         <div className="flex items-center justify-between">
    //             <h3 className="text-sm font-medium text-gray-900">Size</h3>
    //             <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Size guide</a>
    //         </div>

    //         <fieldset aria-label="Choose a size" className="mt-4">
    //             <div className="grid grid-cols-4 gap-3">
    //             <label aria-label="XXS" className="group relative flex items-center justify-center rounded-md border border-gray-300 bg-white p-3 has-checked:border-indigo-600 has-checked:bg-indigo-600 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-indigo-600 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25">
    //                 <input type="radio" name="size" disabled className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed" />
    //                 <span className="text-sm font-medium text-gray-900 uppercase group-has-checked:text-white">XXS</span>
    //             </label>
    //             <label aria-label="XS" className="group relative flex items-center justify-center rounded-md border border-gray-300 bg-white p-3 has-checked:border-indigo-600 has-checked:bg-indigo-600 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-indigo-600 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25">
    //                 <input type="radio" name="size" className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed" />
    //                 <span className="text-sm font-medium text-gray-900 uppercase group-has-checked:text-white">XS</span>
    //             </label>
    //             <label aria-label="S" className="group relative flex items-center justify-center rounded-md border border-gray-300 bg-white p-3 has-checked:border-indigo-600 has-checked:bg-indigo-600 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-indigo-600 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25">
    //                 <input type="radio" name="size" checked className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed" />
    //                 <span className="text-sm font-medium text-gray-900 uppercase group-has-checked:text-white">S</span>
    //             </label>
    //             <label aria-label="M" className="group relative flex items-center justify-center rounded-md border border-gray-300 bg-white p-3 has-checked:border-indigo-600 has-checked:bg-indigo-600 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-indigo-600 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25">
    //                 <input type="radio" name="size" className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed" />
    //                 <span className="text-sm font-medium text-gray-900 uppercase group-has-checked:text-white">M</span>
    //             </label>
    //             <label aria-label="L" className="group relative flex items-center justify-center rounded-md border border-gray-300 bg-white p-3 has-checked:border-indigo-600 has-checked:bg-indigo-600 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-indigo-600 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25">
    //                 <input type="radio" name="size" className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed" />
    //                 <span className="text-sm font-medium text-gray-900 uppercase group-has-checked:text-white">L</span>
    //             </label>
    //             <label aria-label="XL" className="group relative flex items-center justify-center rounded-md border border-gray-300 bg-white p-3 has-checked:border-indigo-600 has-checked:bg-indigo-600 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-indigo-600 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25">
    //                 <input type="radio" name="size" className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed" />
    //                 <span className="text-sm font-medium text-gray-900 uppercase group-has-checked:text-white">XL</span>
    //             </label>
    //             <label aria-label="2XL" className="group relative flex items-center justify-center rounded-md border border-gray-300 bg-white p-3 has-checked:border-indigo-600 has-checked:bg-indigo-600 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-indigo-600 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25">
    //                 <input type="radio" name="size" className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed" />
    //                 <span className="text-sm font-medium text-gray-900 uppercase group-has-checked:text-white">2XL</span>
    //             </label>
    //             <label aria-label="3XL" className="group relative flex items-center justify-center rounded-md border border-gray-300 bg-white p-3 has-checked:border-indigo-600 has-checked:bg-indigo-600 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-indigo-600 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25">
    //                 <input type="radio" name="size" className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed" />
    //                 <span className="text-sm font-medium text-gray-900 uppercase group-has-checked:text-white">3XL</span>
    //             </label>
    //             </div>
    //         </fieldset>
    //         </div>

    //         <button type="submit" className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden">Add to bag</button>
    //     </form>
    // </div>
  )
}

export default InformationService