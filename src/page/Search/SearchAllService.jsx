import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getServices, selectAllService, selectAllServiceError, selectAllServiceStatus, selectServiceAround } from '../../features/serviceSlice'
import ServiceCard from '../../components/modules/Cards/ServiceCard'
import { selectAccessToken } from '../../features/authSlice'
import NoServiceNearby from '../../store/NoServiceNearby'

const SearchAllService = () => {
  const dispatch = useDispatch()
  
  const servicesAround = useSelector(selectServiceAround)
  const status = useSelector(selectAllServiceStatus)
  const error = useSelector(selectAllServiceError)
  const token = useSelector(selectAccessToken)

  useEffect(() => {
      if (status === 'idle' && !allServices) {
          dispatch(getServices()) 
      }
  }, [status, dispatch])

  
  if (status === 'loading') {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='text-center'>
                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto'></div>
                <p className='mt-4 text-gray-600'>Memuat data...</p>
            </div>
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
      <div className='min-h-screen py-[15px] flex flex-col gap-[15px] xl:px-[150px] lg:px-[100px] md:px-[55px] sm:px-[35px] px-[10px] mx-auto'>
            {servicesAround.length === 0 ? (
                <NoServiceNearby/>
            ) : (
            <div className='grid gap-y-10 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 md:gap-x-6 gap-x-4'>
                {servicesAround.map((service) => (
                    <ServiceCard
                        idService={service.id}
                        image={service.foto_product}
                        serviceName={service.nama_jasa}
                        key={service.id}
                        basePrice={service.base_price}
                        topPrice={service.top_price}
                        desc={service.deskripsi}
                        guest={token ? false : true}
                    />
                ))}
            </div>
            )}
      </div>
  )
}

export default SearchAllService