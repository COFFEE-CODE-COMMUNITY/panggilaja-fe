import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getReviewByServicesById, getServicesById, selectAllServiceReview, selectReviewServiceStatus, selectSelectedService, selectSelectedServiceStatus } from '../../features/serviceSlice'

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

    console.log(service)
    console.log(review)
  return (
    <div className='flex min-h-screen'>
        <div className='min-h-screen w-1/2'>s</div>
        <div className='h-full w-1/2'></div>
    </div>
  )
}

export default DetailService