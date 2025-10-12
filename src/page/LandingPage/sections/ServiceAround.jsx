import React from 'react'
import Card from '../../../components/common/Card'
import {AroundService} from '../dummy/ServiceAroundData'

const ServiceAround = () => {
  return (
    <div className='w-full'>
        <div className='flex items-center'>
            <p className='xl:text-h2 md:text-h3 text-h4 font-semibold flex-1'>Jasa di sekitarmu</p>
            <p className='xl:text-h4 md:text-h5 text-h6 font-light'>Lihat semua</p>
        </div>
        <div className='grid lg:gap-[20px] gap-[10px] w-full lg:grid-cols-4 grid-cols-2'>
            {AroundService.map((service) => (
                <Card key={service.id} className='flex-1 lg:h-[409px] h-[300px] rounded-[40px] overflow-hidden relative border-2 border-gray-100'>
                    <div className='h-3/4 bg-amber-100'></div>
                    <div className='bg-white absolute bottom-0 left-0 right-0 lg:h-[171px] h-[130px] rounded-tl-[25px] rounded-tr-[25px] p-[10px] flex flex-col gap-0'>
                        <div className='h-[53px]'></div>
                        <div className='h-[68px]'></div>
                        <div className='h-[30px]'></div>
                    </div>
                </Card>
            ))}
        </div>
    </div>
  )
}

export default ServiceAround