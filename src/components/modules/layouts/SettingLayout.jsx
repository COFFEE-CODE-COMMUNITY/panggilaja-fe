import React, { useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { NavLink, Outlet, useLocation } from 'react-router-dom'

const SettingLayout = () => {
  const location = useLocation()
  return (
    <div className='min-h-screen xl:px-[300px] lg:px-[200px] md:px-[100px] px-[10px] flex'>
        {/* mobile version */}
        {location.pathname === '/setting' && (
          <div className={`w-full h-screen flex-col gap-[15px] sm:hidden`}>
              <p className='lg:text-h2 md:text-h3 text-h4 font-medium'>Pengaturan</p>
              <div className='w-full h-full flex flex-col'>
                  <NavLink 
                    to='profile'
                    className='py-2 flex items-center group hover:bg-gray-50'
                  >
                    <p className='w-full'>Profile</p>
                    <FaArrowRight className='text-gray-400 group-hover:text-primary'/>
                  </NavLink>
              </div>
          </div>
        )}

        {/* dekstop version */}
        <div className='sm:w-1/3 w-full h-screen flex-col px-[15px] py-[10px] gap-[15px] hidden sm:flex'>
            <p className='lg:text-h2 md:text-h3 text-h4 font-medium'>Settings</p>
            <div className='w-full h-full flex flex-col'>
                <NavLink 
                  to='profile'
                  className='border-l border-gray-200 lg:px-[10px] px-[5px]'
                >
                  Profile
                </NavLink>
            </div>
        </div>
        {location.pathname != '/setting' && (
          <div className='w-full h-screen relative'>
              <Outlet/>
          </div>
        )}
    </div>
  )
}

export default SettingLayout