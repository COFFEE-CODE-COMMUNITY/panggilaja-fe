import React from 'react'
import Card from '../../common/Card'
import { FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ServiceCard = ({image, idService, serviceName, basePrice, topPrice, sellerName }) => {
  return (
    <Card 
        className='hover:scale-102 hover:shadow-sm transition-all duration-300 rounded-md'
        to={`service/${idService}`}
    >
        <img 
            src={image} 
            className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8" 
        />
        <div className="px-3 pb-4">
            <h3 className="mt-4 text-h5 text-gray-700">{serviceName}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">Rp {basePrice} - {topPrice}</p>
            <div className='flex gap-[5px] py-[5px]'>
                <FaStar className='text-star lg:text-[12px] md:text-[10px] text-[8px]'/>
                <FaStar className='text-star lg:text-[12px] md:text-[10px] text-[8px]'/>
                <FaStar className='text-star lg:text-[12px] md:text-[10px] text-[8px]'/>
                <FaStar className='text-star lg:text-[12px] md:text-[10px] text-[8px]'/>
                <FaStar className='text-star lg:text-[12px] md:text-[10px] text-[8px]'/>
            </div>
        </div>

        {/* <img 
            src={`${image}`} 
            className='h-3/4 w-full object-cover' 
        ></img>
        <div className='bg-white absolute bottom-0 left-0 right-0 lg:h-[140px] md:h-[130px] h-[110px]  rounded-tl-[15px] rounded-tr-[15px] lg:px-[20px] lg:py-[15px] md:px-[15px] md:py-[10px] px-[15px] py-[10px] flex flex-col md:gap-[1px] gap-0'>
            <p className='md:text-h5 text-h6 cursor-pointer'>{serviceName}</p>
            <p className='md:text-h5 text-h6 font-semibold'>{basePrice} - {topPrice}</p>
            <div className='flex gap-[5px] py-[5px]'>
                <FaStar className='text-star lg:text-[12px] md:text-[10px] text-[8px]'/>
                <FaStar className='text-star lg:text-[12px] md:text-[10px] text-[8px]'/>
                <FaStar className='text-star lg:text-[12px] md:text-[10px] text-[8px]'/>
                <FaStar className='text-star lg:text-[12px] md:text-[10px] text-[8px]'/>
                <FaStar className='text-star lg:text-[12px] md:text-[10px] text-[8px]'/>
            </div>
            <p className='text-h6 font-light'>{sellerName}</p>
        </div> */}
    </Card>
  )
}

export default ServiceCard