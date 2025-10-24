import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ImageService from './sections/ImageService'
import { getServicesById, selectSelectedService, selectSelectedServiceStatus } from '../../features/serviceSlice'
import { useEffect } from 'react'
import InformationService from './sections/InformationService'

const DetailService = () => {
  const {id} = useParams()
  const dispatch = useDispatch()

  const service = useSelector(selectSelectedService)
  const status = useSelector(selectSelectedServiceStatus)

  useEffect(() => {
    if(id){
      dispatch(getServicesById(id))
    }
  },[dispatch])

  if(status === 'loading'){
    return (
      <div className='absolute top-0 left-0 right-0 bottom-0 bg-white flex justify-center items-center'>
        loading...
      </div>
    )
  }

  
  return (
    <div className='md:flex min-h-screen w-full gap-[35px] mb-[50px]'>
        {status === 'loading' && <div className='w-full h-screen'>loading</div>}
        {status === 'success' && (
          <>
            <ImageService image={service.foto_product}/>
            {service && (
              <InformationService
                description={service.deskripsi}
                idProvider={service.seller_id}
                idService={service.id}
                nameService={service.nama_jasa}
                totalReviewSeller={service.jumlah_rating}
                totalReview={service.jumlah_rating}
                basePrice={service.base_price}
                topPrice={service.top_price}
              />
            )}
          </>
        )}
    </div>
  )
}

export default DetailService