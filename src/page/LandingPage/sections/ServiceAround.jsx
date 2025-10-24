import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getServices, selectAllService, selectAllServiceStatus } from '../../../features/serviceSlice'
import ServiceCard from '../../../components/modules/Cards/ServiceCard'

const ServiceAround = () => {
    const dispatch = useDispatch()
    const services = useSelector(selectAllService)
    const servicesStatus = useSelector(selectAllServiceStatus)

    useEffect(() => {
        dispatch(getServices())
    },[dispatch])

    if(servicesStatus === 'loading'){
        return (
            <div>Sedang memuat...</div>
        )
    }

    if(servicesStatus === 'error'){
        return (
            <div>terjadi kesalahan</div>
        )
    }


    const servicesSlice = services.slice(0,8)

    console.log(servicesStatus)
  return (
    <div className='w-full flex flex-col md:gap-[10px] gap-[5px]'>
        <div className='flex items-center'>
            <p className='xl:text-h4 text-h5 font-semibold flex-1'>Jasa di sekitarmu</p>
            <p className='xl:text-h5 text-h6 font-light cursor-pointer'>Lihat semua</p>
        </div>
        {services.length === 0 && <div><p className='text-h6'>Jasa masih kosong</p></div>}
        <div className='grid lg:gap-[10px] md:gap-[7px] gap-[4px] w-full lg:grid-cols-4 grid-cols-2'>
            {servicesSlice.map((service) => (
                <ServiceCard
                    idService={service.id}
                    image={service.foto_product}
                    serviceName={service.nama_jasa}
                    key={service.id}
                    basePrice={service.base_price}
                    topPrice={service.top_price}
                    sellerName={service.seller.nama_toko}
                />
            ))}
        </div>
    </div>
  )
}

export default ServiceAround