import React from 'react'
import Card from '../../../components/common/Card'
import {AroundService} from '../dummy/ServiceAroundData'
import Bannerr from '../../../assets/Bannerr.jpeg'
import { FaStar } from 'react-icons/fa'

const ServiceAround = () => {
  return (
    <div className='w-full flex flex-col md:gap-[10px] gap-[5px]'>
        <div className='flex items-center'>
            <p className='xl:text-h3 md:text-h4 text-h5 font-semibold flex-1'>Jasa di sekitarmu</p>
            <p className='xl:text-h5 text-h6 font-light cursor-pointer'>Lihat semua</p>
        </div>
        <div className='grid lg:gap-[15px] md:gap-[10px] gap-[5px] w-full lg:grid-cols-4 grid-cols-2'>
            {AroundService.map((service) => (
                <Card key={service.id} className='flex-1 lg:h-[409px] md:h-[350px] h-[220px] md:rounded-[25px] rounded-[10px] overflow-hidden relative border-2 border-gray-100 cursor-pointer'>
                    <div className='h-3/4 bg-amber-100' style={{
                        backgroundImage : `url(${Bannerr    })`
                    }}></div>
                    <div className='bg-white absolute bottom-0 left-0 right-0 lg:h-[171px] md:h-[130px] h-[100px] md:rounded-tl-[25px] md:rounded-tr-[25px] rounded-tl-[10px] rounded-tr-[10px] lg:px-[20px] lg:py-[15px] md:px-[15px] md:py-[10px] px-[10px] py-[5px]  flex flex-col gap-0'>
                        <div className='h-[53px] flex md:gap-[20px] gap-[5px] items-center'>
                            <img src={Bannerr} alt="" className='lg:w-[40px] lg:h-[40px] md:w-[30px] md:h-[30px] w-[20px] h-[20px] rounded-full' />
                            <p className='md:text-h5 text-h6 w-full leading-4'>{service.name}</p>
                        </div>
                        <div className='h-full'>
                            <p className='lg:text-h3 md:text-h4 text-h5'>{service.role}</p>
                            <p className='md:text-h5 text-h6 font-light'>{service.price_range}</p>
                        </div>
                        <div className='h-[30px] flex gap-[5px] py-[5px]'>
                            <FaStar className='text-star lg:text-[20px] md:text-[15px] text-[10px]'/>
                            <FaStar className='text-star lg:text-[20px] md:text-[15px] text-[10px]'/>
                            <FaStar className='text-star lg:text-[20px] md:text-[15px] text-[10px]'/>
                            <FaStar className='text-star lg:text-[20px] md:text-[15px] text-[10px]'/>
                            <FaStar className='text-star lg:text-[20px] md:text-[15px] text-[10px]'/>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    </div>
  )
}

export default ServiceAround