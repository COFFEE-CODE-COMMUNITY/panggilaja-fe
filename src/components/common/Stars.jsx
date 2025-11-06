import React from 'react'
import { FaStar } from 'react-icons/fa'

const Stars = ({many, variant = 'black'}) => {
    let starsAmount = []
    for(let i = 0; i < 5; i++){
        if(i >= many){
            starsAmount.push(<FaStar key={i} className='text-gray-400 lg:text-[12px] md:text-[10px] text-[8px]'/>)
        }else{
            starsAmount.push(<FaStar key={i} className={`${variant === 'star' ? 'text-star' : 'text-gray-700'} lg:text-[12px] md:text-[10px] text-[8px]`}/>)
        }
    }
    return (
        <div className='flex gap-1'>
            {starsAmount.map((star) => (
                star
            ))}
        </div>
    )
}

export default Stars