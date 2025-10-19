import React, { useEffect } from 'react'
import Card from '../../../components/common/Card'
import {AroundService} from '../../../dummy/ServiceAroundData'
import Bannerr from '../../../assets/Bannerr.jpeg'
import { FaStar } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { getServices, selectAllService, selectAllServiceStatus } from '../../../features/serviceSlice'
import { Link } from 'react-router-dom'
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

  return (
    <div className='w-full flex flex-col md:gap-[10px] gap-[5px]'>
        <div className='flex items-center'>
            <p className='xl:text-h3 md:text-h4 text-h5 font-semibold flex-1'>Jasa di sekitarmu</p>
            <p className='xl:text-h5 text-h6 font-light cursor-pointer'>Lihat semua</p>
        </div>
        <div className='grid lg:gap-[10px] md:gap-[7px] gap-[4px] w-full lg:grid-cols-4 grid-cols-2'>
            {servicesSlice.map((service) => (
                <ServiceCard
                    idService={service.id}
                    image={Bannerr}
                    name={service.name}
                    priceService={service.price_range}
                    roleService={service.role}
                    key={service.id}
                />
                // <Card key={service.id} className='flex-1 lg:h-[360px] md:h-[350px] h-[220px] md:rounded-[25px] rounded-[10px] overflow-hidden relative border-2 border-gray-100'>
                //     <div className='h-3/4 bg-amber-100' style={{
                //         backgroundImage : `url(${Bannerr    })`
                //     }}></div>
                //     <div className='bg-white absolute bottom-0 left-0 right-0 lg:h-[140px] md:h-[130px] h-[90px]  rounded-tl-[15px] rounded-tr-[15px] lg:px-[20px] lg:py-[15px] md:px-[15px] md:py-[10px] px-[15px] py-[10px] flex flex-col md:gap-[1px] gap-0'>
                //         <Link to={`service/${service.id}`}>
                //             <p className='lg:text-h4 md:text-h5 text-h6 cursor-pointer'>{service.role}</p>
                //         </Link>
                //         <p className='md:text-h5 text-h6 font-semibold'>{service.price_range}</p>
                //         <div className='flex gap-[5px] py-[5px]'>
                //             <FaStar className='text-star lg:text-[12px] md:text-[10px] text-[8px]'/>
                //             <FaStar className='text-star lg:text-[12px] md:text-[10px] text-[8px]'/>
                //             <FaStar className='text-star lg:text-[12px] md:text-[10px] text-[8px]'/>
                //             <FaStar className='text-star lg:text-[12px] md:text-[10px] text-[8px]'/>
                //             <FaStar className='text-star lg:text-[12px] md:text-[10px] text-[8px]'/>
                //         </div>
                //         <p className='text-h6 w-full leading-4 font-light'>{service.name}</p>
                //     </div>
                // </Card>
            ))}
        </div>
    </div>
  )
}

export default ServiceAround