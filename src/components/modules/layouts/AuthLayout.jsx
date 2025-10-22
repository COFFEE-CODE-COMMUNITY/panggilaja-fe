import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import NavLink from '../navigation/NavLink'
import Button from '../../common/Button'
import bgAuth from '../../../assets/bgAuth.jpg'
import { FcGoogle } from 'react-icons/fc'

const AuthLayout = ({title, subtitle, children, type, navAuth, reset}) => {
  return (
    <div className='flex min-h-screen relative '>
      <div className='w-full md:w-1/2 min-h-screen'>
        <Link to='/'>
          <div className='lg:p-[10px] md:p-[8px] px-[5px] py-[10px] pl-[10px] sticky top-0 left-0 right-0 rounded-br-[40px] sm:bg-white bg-primary'>
            <p link='/' className='text-h4 lg:text-h3 font-bold sm:text-primary text-white'>Panggil Aja</p>
          </div>
        </Link>
        <div className='flex justify-center items-center h-full rounded-tl-[40px] relative'>
          <div className='px-[30px] py-[20px] w-[532px] flex flex-col gap-[10px]'>
            <div>
              <h2 className='md:text-h3 text-h2  font-medium'>{title}</h2>
              <p className='md:text-h5 text-h6 lg:text-secondary '>{subtitle}</p>
            </div>
            {children}
            {navAuth}
          </div>
        </div>
      </div>

      <div className='hidden md:block fixed top-0 bottom-0 right-0 md:w-1/2'>
        <div className='rounded-tl-[20px] rounded-bl-[20px] h-full w-full' style={{
          backgroundImage : `url(${bgAuth})`,
          backgroundSize: 'cover', 
          backgroundPosition: 'center',  
          backgroundRepeat: 'no-repeat'
        }}></div>
      </div>
    </div>
  )
}

export default AuthLayout