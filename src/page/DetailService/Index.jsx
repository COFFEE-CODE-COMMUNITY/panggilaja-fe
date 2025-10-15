import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getReviewByServicesById, getServicesById, selectAllServiceReview, selectReviewServiceStatus, selectSelectedService, selectSelectedServiceStatus } from '../../features/serviceSlice'
import ImageService from './sections/ImageService'
import InformationService from './sections/InformationService'

const DetailService = () => {
    const {id} = useParams()
    const dispatch = useDispatch()

    const service = useSelector(selectSelectedService)
    const serviceStatus = useSelector(selectSelectedServiceStatus)
    const review = useSelector(selectAllServiceReview)
    const reviewStatus = useSelector(selectReviewServiceStatus)

    useEffect(() => {
      if(id){
        dispatch(getServicesById(id))

        dispatch(getReviewByServicesById(id))
      }
    }, [id, dispatch])

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

    console.log(service)
    console.log(review)
  return (
    <div className='md:flex min-h-screen gap-[35px]'>
        <ImageService/>
        <InformationService
          name={service.name}
          title={service.role}
          totalReview={service.review_count}
          description={service.description}
        />
    </div>
  )
}

export default DetailService