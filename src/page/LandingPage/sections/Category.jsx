import React from 'react'
import { CategoriesService } from '../dummy/CategoryData'
import Card from '../../../components/common/Card'
import { FaTools, FaHome, FaPaintBrush, FaGraduationCap, FaHeartbeat, FaBroom } from 'react-icons/fa'


const Category = () => {
  return (
    <div className='w-full flex flex-col md:gap-[10px] gap-[5px]'>
        <p  className='xl:text-h4 text-h5 font-semibold'>Kategori jasa</p>
        <div className='grid xl:grid-cols-6 grid-cols-3 xl:gap-[20px] lg:gap-[15px] gap-[10px] w-full'>
            {CategoriesService.map((category) => {
                const LogoItems = category.logo
                return (
                    <Card className='flex-1 lg:h-[150px] md:h-[130px] h-[100px] md:rounded-[25px] rounded-[10px] flex flex-col px-[15px] py-[10px] cursor-pointer border-2 border-gray-100 shadow-sm hover:bg-primary group' key={category.id}>
                        <LogoItems className='lg:text-4xl md:text-3xl text-2xl text-primary h-1/2 group-hover:text-white'/>
                        <h3 className='lg:text-h4 md:text-h5 text-h6 font-medium w-full h-1/2 group-hover:text-white'>{category.name}</h3>
                    </Card>
                )
            })}
        </div>
    </div>
  )
}

export default Category