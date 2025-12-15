import React, { useEffect } from 'react'
import ServiceCard from '../../components/modules/Cards/ServiceCard'
import { useDispatch, useSelector } from 'react-redux'
import { getServices, selectAllService } from '../../features/serviceSlice'
import { selectSelectedSeller } from '../../features/sellerSlice'

const ProfileServices = () => {
  const services = useSelector(selectAllService)
  const seller = useSelector(selectSelectedSeller)
  const dispatch = useDispatch()

  useEffect(() => {
    if (services.length === 0 || !services) {
      dispatch(getServices())
    }
  }, [dispatch])

  const servicesSeller = services?.filter((service) => service.seller_id === seller?.id)
  console.log(services)
  return (
    <div className='min-h-screen'>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {servicesSeller.map((service, index) => (
          <ServiceCard
            basePrice={service?.base_price}
            topPrice={service?.top_price}
            idService={service?.id}
            image={service?.foto_product}
            sellerName={service?.seller_name}
            serviceName={service?.nama_jasa}
            star={5}
            key={index}
          />
        ))}
      </div>
    </div>
  )
}

export default ProfileServices
