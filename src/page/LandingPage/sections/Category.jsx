import React from 'react'
import { CategoriesService } from '../dummy/CategoryData'
import Card from '../../../components/common/Card'

const Category = () => {
  return (
    <div className='w-full flex flex-col md:gap-[10px] gap-[5px]'>
        <p  className='xl:text-h3 md:text-h4 text-h5 font-semibold'>Kategori jasa</p>
        <div className='grid lg:grid-cols-6 grid-cols-3 xl:gap-[25px] lg:gap-[15px] gap-[10px] w-full'>
            {CategoriesService.map((category) => (
                <Card className='flex-1 lg:h-[80px] md:h-[60px] h-[45px] md:rounded-[25px] rounded-[10px] flex justify-center items-center px-[10px] py-[5px] bg-black/35 bg-blend-darken' key={category.id} style={{
                    backgroundImage : `url(${category.image})`,
                    backgroundPosition: 'center', 
                    backgroundSize: 'cover',   
                    backgroundRepeat: 'no-repeat' 
                }}>
                    <h3 className='lg:text-h4 md:text-h5 text-h6 text-center font-extrabold text-white lg:leading-7 md:leading-5 leading-4'>{category.name}</h3>
                </Card>
            ))}
        </div>
    </div>
  )
}

export default Category