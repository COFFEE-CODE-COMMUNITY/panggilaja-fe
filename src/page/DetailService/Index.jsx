import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getDetailServicesById, getReviewByServicesById, getServicesById, selectAllServiceReview, selectDetailService, selectDetailServiceStatus, selectReviewServiceStatus, selectSelectedService, selectSelectedServiceStatus } from '../../features/serviceSlice'
import ImageService from './sections/ImageService'
import InformationService from './sections/InformationService'

const DetailService = () => {
    const {id} = useParams()
    const dispatch = useDispatch()

    const service = useSelector(selectSelectedService)
    const serviceStatus = useSelector(selectSelectedServiceStatus)
    const review = useSelector(selectAllServiceReview)
    const reviewStatus = useSelector(selectReviewServiceStatus)
    const detailService = useSelector(selectDetailService)
    const detailServiceStatus = useSelector(selectDetailServiceStatus)


    useEffect(() => {
      if(id){
        dispatch(getServicesById(id))
        dispatch(getReviewByServicesById(id))
      }
    }, [id, dispatch])

    useEffect(() => {
      if(service){
        dispatch(getDetailServicesById(service.provider_id))
      }
    },[dispatch, service])

    if(serviceStatus === 'loading'){
      return (
        <div>Sedang memuat...</div>
      )
    }

    if(serviceStatus === 'error'){
      return (
        <div>terjadi kesalahan</div>
      )
    }

    if(!service){
      return (
        <div>data tidak ada</div>
      )
    }

    if(detailServiceStatus == 'loading'){
      return (
        <div>Sedang memuat...</div>
      )
    }

    if(detailServiceStatus == 'error'){
      return (
        <div>data tidak ada</div>
      )
    }

    if(!detailService){
      return (
        <div>Sedang memuat...</div>
      )
    }
    
    console.log(review)
  return (
    <div className='md:flex min-h-screen gap-[35px]'>
        <ImageService/>
        <InformationService
          name={service.name}
          title={service.role}
          totalReview={service.review_count}
          description={service.description}
          rangePrice={service.price_range}
          overalRating={detailService.overal_rating}
          allTotalReview={detailService.total_reviews_count}
          review={review}
        />
    </div>
  )
}

export default DetailService