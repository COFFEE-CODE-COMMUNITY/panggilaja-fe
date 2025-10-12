import React from 'react'
import { CategoriesService } from '../dummy/CategoryData'
import Card from '../../../components/common/Card'

const Category = () => {
  return (
    <div className='w-full'>
        <p  className='xl:text-h2 md:text-h3 text-h4 font-semibold'>Kategori jasa</p>
        <div className='grid lg:grid-cols-6 grid-cols-3 xl:gap-[25px] lg:gap-[15px] gap-[10px] w-full py-[10px] '>
            {CategoriesService.map((category) => (
                <Card className='flex-1 bg-amber-300 lg:h-[127px] h-[70px] rounded-[25px] flex justify-center items-center p-5' key={category.id} style={{
                    backgroundImage : `url(${category.image})`,
                    backgroundPosition: 'center', 
                    backgroundSize: 'cover',   
                    backgroundRepeat: 'no-repeat' 
                }}>
                    <h3 className='xl:text-h3 md:text-h4 text-h6 text-center font-extrabold text-white'>{category.name}</h3>
                </Card>
            ))}
        </div>
    </div>
  )
}

export default Category