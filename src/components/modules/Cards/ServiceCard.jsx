import React from 'react'
import Card from '../../common/Card'
import { FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ServiceCard = ({image, idService, serviceName, basePrice, topPrice }) => {
  return (
    <Link to={`/service/${idService}`}>
        <Card className='flex-1 lg:h-[320px] md:h-[350px] h-[220px] rounded-[15px] overflow-hidden relative hover:outline-1 hover:outline-gray-100 hover:shadow-sm'>
            <img 
                src={`${image}`} 
                className='h-3/4 w-full object-cover' 
            ></img>
            <div className='bg-white absolute bottom-0 left-0 right-0 lg:h-[140px] md:h-[130px] h-[90px]  rounded-tl-[15px] rounded-tr-[15px] lg:px-[20px] lg:py-[15px] md:px-[15px] md:py-[10px] px-[15px] py-[10px] flex flex-col md:gap-[1px] gap-0'>
                <p className='md:text-h5 text-h6 cursor-pointer'>{serviceName}</p>
                <p className='md:text-h5 text-h6 font-semibold'>{basePrice} - {topPrice}</p>
                <div className='flex gap-[5px] py-[5px]'>
                    <FaStar className='text-star lg:text-[12px] md:text-[10px] text-[8px]'/>
                    <FaStar className='text-star lg:text-[12px] md:text-[10px] text-[8px]'/>
                    <FaStar className='text-star lg:text-[12px] md:text-[10px] text-[8px]'/>
                    <FaStar className='text-star lg:text-[12px] md:text-[10px] text-[8px]'/>
                    <FaStar className='text-star lg:text-[12px] md:text-[10px] text-[8px]'/>
                </div>
            </div>
        </Card>
    </Link>
  )
}

export default ServiceCard