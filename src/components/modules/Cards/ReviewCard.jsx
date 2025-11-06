import React from 'react'
import Card from '../../common/Card'
import Stars from '../../common/Stars'

const ReviewCard = ({profileImage, name, date, rating, reviewText}) => {

    return (
    <Card className='flex gap-5'>
        <div>
            <img className='w-20 aspect-square rounded-full bg-amber-200'/>
        </div>
        <div className='flex flex-col gap-3'>
            <div>
                <p>Asep</p>
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