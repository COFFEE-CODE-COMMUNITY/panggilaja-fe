import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ImageService from './sections/ImageService'
import { getServicesById, selectSelectedService } from '../../features/serviceSlice'
import { useEffect } from 'react'
import InformationService from './sections/InformationService'

const DetailService = () => {
  const {id} = useParams()
  const dispatch = useDispatch()

  const service = useSelector(selectSelectedService)

  useEffect(() => {
    if(id){
      dispatch(getServicesById(id))
    }
  },[dispatch])

  const rangePrice = `${service.base_price} - ${service.top_price}`
  
  console.log(service)
  return (
    <div className='md:flex min-h-screen gap-[35px]'>
        <ImageService/>
        <InformationService
          description={service.deskripsi}
          idProvider={service.seller_id}
          idService={service.id}
          nameService={service.nama_jasa}
          rangePrice={rangePrice}
          totalReview={service.rata_rata_rating}
          totalReviewSeller={service.jumlah_rating}
        />
    </div>
  )
}

export default DetailService