import React from 'react'
import Card from '../../common/Card'
import Stars from '../../common/Stars'

const ReviewCard = ({profileImage, name, date, rating, reviewText}) => {

    return (
    <Card className='flex lg:gap-5 md:gap-4 gap-3 bg-gray-50/40 py-3 rounded-xl'>
        <div>
            <img className='lg:w-20 md:w-30 w-40 aspect-square rounded-full bg-amber-200'/>
        </div>
        <div className='flex flex-col lg:gap-3 md:gap-2 gap-1'>
            <div>
                <p className=''>Asep</p>
                <p className='font-light'>20-09-2025</p>
            </div>
            <Stars
                many={5}
                variant='star'
            />
            <p className='font-light'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae labore praesentium mollitia iste excepturi eius minus quaerat cum unde ducimus dolorum explicabo accusamus, nostrum velit accusantium quae sunt hic totam.
            </p>
        </div>
    </Card>
  )
}

export default ReviewCard