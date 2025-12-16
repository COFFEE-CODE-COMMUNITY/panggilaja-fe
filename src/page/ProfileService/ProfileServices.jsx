import React, { useEffect } from 'react'
import ServiceCard from '../../components/modules/Cards/ServiceCard'
import { useDispatch, useSelector } from 'react-redux'
import { getServices, selectAllService } from '../../features/serviceSlice'
import { selectSelectedSeller } from '../../features/sellerSlice'
import { useLocation } from 'react-router-dom'

const ProfileServices = () => {
  const services = useSelector(selectAllService)
  const seller = useSelector(selectSelectedSeller)
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    if (services.length === 0 || !services) {
      dispatch(getServices())
    }
  }, [dispatch])

  const servicesSeller = services?.filter((service) => service.seller_id === seller?.id)

  const isDashboard = location.pathname.includes('/dashboard');

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
            star={service?.rata_rata_star}
            key={index}
            customLink={isDashboard ? `/dashboard/service/${service?.id}` : `/service/${service?.id}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ProfileServices
