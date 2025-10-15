import React from 'react'
import Card from '../../common/Card'

const ReviewCard = ({profileImage, name, date, rating, reviewText}) => {

    return (
    <Card className='px-[20px] py-[15px] bg-slate-50 rounded-[20px]'>
        <div className='flex gap-[10px] items-center'>
            <img className='bg-amber-100 h-[20px] w-[20px] rounded-full' />
            <p className='text-h4'>{name}</p>
            <p className='flex-1 text-h6'>{date}</p>
            <div className='flex-1 text-right text-h6'>{rating}</div>
        </div>
        <p className='font-light'>{reviewText}</p> 
    </Card>
  )
}

export default ReviewCard