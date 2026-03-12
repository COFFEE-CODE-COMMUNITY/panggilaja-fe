import React, { useEffect } from 'react'
import ServiceCard from '../../components/modules/Cards/ServiceCard'
import { useParams, useLocation } from 'react-router-dom'
import { useGetSellerServices } from '../../hooks/useSellers'

const ProfileServices = () => {
  const { id } = useParams()
  const location = useLocation()

  const { data: sellerServicesResponse } = useGetSellerServices(id);
  const servicesSeller = sellerServicesResponse?.data || sellerServicesResponse || [];

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
