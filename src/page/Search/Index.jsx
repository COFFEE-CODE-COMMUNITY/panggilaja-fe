import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getServices, selectAllService, selectAllServiceError, selectAllServiceStatus, selectServiceAround } from '../../features/serviceSlice'
import { selectSearchText } from '../../features/searchSlice'
import ServiceCard from '../../components/modules/Cards/ServiceCard'
import { useLocation } from 'react-router-dom'
import NoServiceNearby from '../../store/NoServiceNearby'

const SearchPage = () => {
  const dispatch = useDispatch()
  
  const servicesAround = useSelector(selectServiceAround)
  const status = useSelector(selectAllServiceStatus)
  const error = useSelector(selectAllServiceError)

  const searchText = useSelector(selectSearchText) 
  const lowerCaseSearchText = searchText.toLowerCase().trim()

  useEffect(() => {
      if (status === 'idle' && !allServices) {
          dispatch(getServices()) 
      }
  }, [status, dispatch])

  const serviceSearch = servicesAround?.filter(service => {
      return service.nama_jasa.toLowerCase().includes(lowerCaseSearchText)
  })
  
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
      <div className='min-h-screen xl:px-[150px] lg:px-[100px] md:px-[55px] sm:px-[35px] px-[10px] py-[15px] flex flex-col gap-[15px]'>
          {servicesAround?.length === 0 && (
              <NoServiceNearby/>
          )}
          
          {serviceSearch?.length === 0 && lowerCaseSearchText !== '' && servicesAround > 0 && (
              <p className='text-h5 text-gray-600'>Tidak ditemukan hasil untuk "{searchText}".</p>
          )}

          {servicesAround > 0 && (
            <>
              <p className='font-medium'>Hasil Pencarian untuk: {searchText}</p>
               <div className='grid md:grid-cols-4 grid-cols-2 gap-x-1 gap-y-4 md:gap-x-2 md:gap-y-5 lg:gap-x-3 lg:gap-y-6'>
                  {serviceSearch?.map((service) => (
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
            </>
          )}
      </div>
    //   <div className='min-h-screen xl:px-[150px] lg:px-[100px] md:px-[55px] sm:px-[35px] px-[10px] py-[15px] flex flex-col gap-[15px]'>          
    //         {serviceSearch.length === 0 && lowerCaseSearchText !== '' ? (
    //             <NoServiceNearby/>
    //         ) : (
    //             servicesAround.length === 0 ? (
    //                 <>
    //                     <p className='font-medium'>Hasil Pencarian untuk: {searchText}</p>
    //                     <div className='grid md:grid-cols-4 grid-cols-2 gap-x-1 gap-y-4 md:gap-x-2 md:gap-y-5 lg:gap-x-3 lg:gap-y-6'>
    //                         {serviceSearch.map((service) => (
    //                             <ServiceCard
    //                                 idService={service.id}
    //                                 image={service.foto_product}
    //                                 serviceName={service.nama_jasa}
    //                                 key={service.id}
    //                                 basePrice={service.base_price}
    //                                 topPrice={service.top_price}
    //                             />
    //                         ))}
    //                     </div>
    //                 </>
    //             ) : (
                    
    //             )
    //         )}
    //     </div>
  )
}

export default SearchPage