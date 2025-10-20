import React from 'react'
import { Link } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className=''>
        <div className='w-full xl:h-[80px] lg:h-[72px] md:h-[64px] sm:h-[56px] h-[48px] bg-amber-50'></div>
        <div className='w-full relative'>
            <div className='bg-amber-200 w-1/5 min-h-screen fixed left-0 flex flex-col px-[15px]'>
                <Link to='.'>Kelola Pesanan</Link>
                <Link to='manage-services'>Kelola Jasa</Link>
                <Link>Kelola Profile</Link>
            </div>
            <div className='min-h-screen'>

            </div>
        </div>
    </div>
  )
}

export default DashboardLayout