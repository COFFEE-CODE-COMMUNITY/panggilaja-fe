import React from 'react'
import NavLink from '../navigation/NavLink'
import SearchBar from '../navigation/SearchBar'
import Input from '../../common/Input'
import Button from '../../common/Button'

const Header = () => {
  return (
    <div className='h-[89px] w-full px-[97px] py-[5px] flex items-center justify-center bg-amber-300'>
        <NavLink link='/' text='PanggilAja' className='text-h3 text-secondary'/>
        <div className='w-full flex items-center'>
            <Input placeholder='Cari jasa sekarang' className='h-[43px]'/>
            <NavLink text='Jadi Mitra' className='text-h4'/>
        </div>
        <div className='bg-amber-900 p-10'>
            <NavLink link='/login' className='text-h4 text-secondary'/>
            <Button className='h-[45px] w-[130px] text-white text-h4' text='Daftar'/>
        </div>
    </div>
  )
}

export default Header