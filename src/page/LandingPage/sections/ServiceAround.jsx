import React from 'react'
import Card from '../../../components/common/Card'
import {AroundService} from '../dummy/ServiceAroundData'

const ServiceAround = () => {
  return (
    <div className='w-full flex flex-col md:gap-[10px] gap-[5px]'>
        <div className='flex items-center'>
            <p className='xl:text-h3 md:text-h4 text-h5 font-semibold flex-1'>Jasa di sekitarmu</p>
            <p className='xl:text-h5 text-h6 font-light'>Lihat semua</p>
        </div>
        <div className='grid lg:gap-[20px] gap-[5px] w-full grid-cols-4'>
            {AroundService.map((service) => (
                <Card key={service.id} className='flex-1 lg:h-[409px] md:h-[300px] h-[170px] md:rounded-[40px] rounded-[10px] overflow-hidden relative border-2 border-gray-100'>
                    <div className='h-3/4 bg-amber-100'></div>
                    <div className='bg-white absolute bottom-0 left-0 right-0 lg:h-[171px] md:h-[130px] h-[90px] md:rounded-tl-[25px] md:rounded-tr-[25px] rounded-tl-[10px] rounded-tr-[10px] p-[10px] flex flex-col gap-0'>
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