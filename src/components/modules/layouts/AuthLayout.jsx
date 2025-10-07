import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import NavLink from '../navigation/NavLink'
import Button from '../../common/Button'

const AuthLayout = ({title, subtitle, children, type, navAuth}) => {
  return (
    <div className='flex min-h-screen'>

      <div className='w-1/2'>
        <div className='xl:p-[10px] md:p-[5px]'>
          <NavLink link='/' className='text-primary text-h2 font-bold' text='PanggilAja'/>
        </div>
        <div className='flex justify-center items-center'>
          <div className='px-[30px] py-[20px] bg-amber-200 w-[532px]'>
            <div>
              <h2 className='text-h2 font-medium'>{title}</h2>
              <p className='text-secondary text-h4'>{subtitle}</p>
            </div>
            <Button className='w-full h-[62px] bg-white rounded-[30px] text-h4'>Lanjut dengan google</Button>
            <p className='w-full text-center'>atau</p>
            {children}
            <Button className='w-full h-[62px] text-center text-h3 font-semibold bg-primary text-white rounded-[15px]'>{type}</Button>
            {navAuth}
          </div>
        </div>
      </div>

      <div className='w-1/2 '>
        <div className='rounded-tl-[20px] rounded-bl-[20px] bg-amber-100 h-full w-full'></div>
      </div>
    </div>
  )
}

export default AuthLayout