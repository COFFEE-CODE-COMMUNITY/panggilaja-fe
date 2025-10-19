import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getServices, selectAllService, selectAllServiceError, selectAllServiceStatus } from '../../features/serviceSlice'
import { selectSearchText } from '../../features/searchSlice'
import ServiceCard from '../../components/modules/Cards/ServiceCard'

const SearchPage = () => {
    const services = useSelector(selectAllService)
    const status = useSelector(selectAllServiceStatus)
    const error = useSelector(selectAllServiceError)

    const search = useSelector(selectSearchText)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getServices)
    },[dispatch])

    const serviceSearch = services.filter((service) => service.role.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className='min-h-screen px-[20px] py-[15px] grid lg:grid-cols-4 grid-cols-2 gap-[10px]'>
        {serviceSearch && (
            serviceSearch.map((service) => (
                <ServiceCard
                    idService={service.id}
                    name={service.name}
                    priceService={service.price_range}
                    roleService={service.role}
                    key={service.id}
                />
            ))
        )}
    </div>
  )
}

export default SearchPage