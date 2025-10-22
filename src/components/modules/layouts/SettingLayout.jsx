import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const SettingLayout = () => {
  return (
    <div className='min-h-screen xl:px-[300px] lg:px-[200px] md:px-[100px] px-[10px] flex'>
        <div className='lg:w-1/3 w-1/4 h-screen flex flex-col px-[15px] py-[10px] gap-[15px]'>
            <p className='lg:text-h2 md:text-h3 text-h4 font-medium'>Settings</p>
            <div className='w-full h-full flex flex-col'>
                <NavLink className='border-l border-gray-200 lg:px-[10px] px-[5px]'>Profile</NavLink>
            </div>
        </div>
        <div className='lg:w-2/3 w-3/4 h-screen'>
            <Outlet/>
        </div>
    </div>
  )
}

export default SettingLayout