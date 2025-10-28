import React, { useState } from 'react'
import Input from '../../common/Input'
import { FaSearch, FaArrowLeft } from 'react-icons/fa'
import { NavLink, Outlet } from 'react-router-dom'

const ChatLayout = () => {
  const [chatMobile, setChatMobile] = useState(false)
  return (
    <div className='h-full w-full flex'>
        <div className={`h-full sm:w-1/5 w-full px-[10px] py-[5px] sm:flex flex-col lg:gap-[20px] md:gap-[15px] ${chatMobile ? 'hidden' : ''}`}>
          <div className='relative flex items-center'>
            <FaSearch className='absolute left-3 text-gray-400'/>
            <Input placeholder='Cari' className='bg-gray-50 w-full rounded-[5px] px-[40px] placeholder:text-gray-400'/>
          </div>
          <div className=' overflow-auto flex flex-col gap-[10px] sm:my-0 my-[15px]'>
            <NavLink 
              onClick={() => setChatMobile(!chatMobile)}
              className='hover:bg-gray-50/60'
            >
              <div className='flex lg:gap-[20px] md:gap-[15px] gap-[10px] items-center lg:px-[15px] lg:py-[10px] px-[10px] py-[10px] '>
                <img src="" alt="" className='w-[50px] h-[50px] bg-amber-100 rounded-full'/>
                <div>
                  <p>Asep surasep</p>
                  <p className='font-extralight'>hai</p>
                </div>
              </div>
            </NavLink>
          </div>
        </div>
        <div className={`sm:w-4/5 sm:flex flex-col w-full ${chatMobile ? '' : 'hidden'}`}>
          <div className='w-full px-[15px] py-[10px] flex items-center lg:gap-[20px] md:gap-[15px] gap-[10px]'>
            <FaArrowLeft 
              className='sm:hidden text-[15px] text-gray-500 cursor-pointer'
              onClick={() => setChatMobile(false)}
            />
            <div className='flex items-center gap-[10px]'>
              <img src="" alt="" className='w-[50px] h-[50px] rounded-full bg-amber-400'/>
              <p className='font-medium'>Asep surasep</p>
            </div>
          </div>
          <div className='w-full bg-chat/25 flex flex-col relative flex-1'>
            <div className='w-full flex-1'>
              <Outlet/>
            </div>
            <div className='w-full bg-white lg:px-[20px] lg:py-[10px] px-[15px] py-[5px]'>
              <Input placeholder='Pesan'/>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ChatLayout