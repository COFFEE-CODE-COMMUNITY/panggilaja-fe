import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getServices, selectAllService, selectAllServiceError, selectAllServiceStatus } from '../../features/serviceSlice'
import ServiceCard from '../../components/modules/Cards/ServiceCard'

const SearchAllService = () => {
  const dispatch = useDispatch()
  
  const allServices = useSelector(selectAllService)
  const status = useSelector(selectAllServiceStatus)
  const error = useSelector(selectAllServiceError)

  useEffect(() => {
      if (status === 'idle' && !allServices) {
          dispatch(getServices()) 
      }
  }, [status, dispatch])

  
  if (status === 'loading') {
      return (
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-white flex justify-center items-center'>
          <p className='text-h3 font-medium'>
            loading...
          </p>
        </div>
      )
  }
  
  if (status === 'failed') {
      return (
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-white flex justify-center items-center'>
          <p className='text-h3 font-medium'>
            Failed to search, something happened
          </p>
        </div>
      )
  }

  return (
      <div className='min-h-screen px-[20px] py-[15px] flex flex-col gap-[15px]'>
          <div className='grid lg:grid-cols-4 grid-cols-2 gap-[10px]'>
              {allServices.map((service) => (
                  <ServiceCard
                      idService={service.id}
                      image={service.foto_product}
                      serviceName={service.nama_jasa}
                      key={service.id}
                      basePrice={service.base_price}
                      topPrice={service.top_price}
                  />
              ))}
          </div>
      </div>
  )
}

export default SearchAllService