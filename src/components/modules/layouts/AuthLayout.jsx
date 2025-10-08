import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import NavLink from '../navigation/NavLink'
import Button from '../../common/Button'

const AuthLayout = ({title, subtitle, children, type, navAuth}) => {
  return (
    <div className='flex h-screen relative'>
      <div className='w-full md:w-1/2 h-full'>
        <div className='xl:p-[10px] md:p-[5px] pl-[10px] sticky top-0 left-0 right-0 bg-white'>
          <NavLink link='/' className='text-primary text-h3 lg:text-h2 font-bold' text='PanggilAja'/>
        </div>
        <div className='flex justify-center items-center h-full'>
          <div className='px-[30px] py-[20px] w-[532px] flex flex-col gap-[10px]'>
            <div>
              <h2 className='text-h3 lg:text-h2 font-medium'>{title}</h2>
              <p className='text-h5 lg:text-secondary text-h4'>{subtitle}</p>
            </div>
            <Button className='w-full h-[62px] bg-white rounded-[30px] text-h5 lg:text-h4'>Lanjut dengan google</Button>
            <p className='w-full text-center text-h6 lg:text-h5 font-light'>atau</p>
            {children}
            <Button className='w-full h-[62px] text-center text-h4 lg:text-h3 font-semibold bg-primary text-white rounded-[15px]'>{type}</Button>
            {navAuth}
          </div>
        </div>
      </div>

      <div className='hidden md:block fixed top-0 bottom-0 right-0 md:w-1/2'>
        <div className='rounded-tl-[20px] rounded-bl-[20px] bg-amber-100 h-full w-full'></div>
      </div>
    </div>
  )
}

export default AuthLayout