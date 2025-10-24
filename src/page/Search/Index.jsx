import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getServices, selectAllService, selectAllServiceError, selectAllServiceStatus } from '../../features/serviceSlice'
import { selectSearchText } from '../../features/searchSlice'
import ServiceCard from '../../components/modules/Cards/ServiceCard'
import { useLocation } from 'react-router-dom'

const SearchPage = () => {
  const dispatch = useDispatch()
  
  const allServices = useSelector(selectAllService)
  const status = useSelector(selectAllServiceStatus)
  const error = useSelector(selectAllServiceError)

  const searchText = useSelector(selectSearchText) 
  const lowerCaseSearchText = searchText.toLowerCase().trim()

  useEffect(() => {
      if (status === 'idle' && !allServices) {
          dispatch(getServices()) 
      }
  }, [status, dispatch])

  const serviceSearch = allServices.filter(service => {
      return service.nama_jasa.toLowerCase().includes(lowerCaseSearchText)
  })
  
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

  console.log(serviceSearch)
  return (
      <div className='min-h-screen px-[20px] py-[15px] flex flex-col gap-[15px]'>
          <p className='font-medium'>Hasil Pencarian untuk: {searchText}</p>
          
          {serviceSearch.length === 0 && lowerCaseSearchText !== '' && (
              <p className='text-h5 text-gray-600'>Tidak ditemukan hasil untuk "{searchText}".</p>
          )}

          <div className='grid lg:grid-cols-4 grid-cols-2 gap-[10px]'>
              {serviceSearch.map((service) => (
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

export default SearchPage