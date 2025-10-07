import React from 'react'
import NavLink from '../navigation/NavLink'
import SearchBar from '../navigation/SearchBar'
import Input from '../../common/Input'
import Button from '../../common/Button'
import { FaSearch } from 'react-icons/fa'

const Header = () => {
  return (
    <div className='xl:h-[80px] lg:h-[72px] md:h-[64px] sm:h-[56px] h-[48px] w-full flex justify-center xl:gap-[35px] lg:gap-[27px] md:gap-[19px] sm:gap-[10px] gap-[2px] items-center md:px-5 px-2'>
        <div className='p-1 md:p-3 lg:p-10 h-full flex items-center'>
            <NavLink link='/' text='PanggilAja' className='text-h4 sm:text-h3 text-secondary font-bold'/>
        </div>
        <div className='w-full flex items-center gap-0 sm:gap-[5px]'>
            <div className='overflow-hidden w-full flex items-center h-[43px]'>
                <Button className='aspect-square rounded-bl-[25px] rounded-tl-[25px] flex items-center justify-center h-[35px] md:h-[43px]'><FaSearch size={10} color='white'/></Button>
                <div className='w-full flex items-center'>
                    <Input placeholder='Cari jasa sekarang' className='h-[35px] md:h-[43px] text-left md:indent-3 md:placeholder:text-h5 placeholder:text-h6'/>
                </div>
            </div>
            <NavLink text='Jadi Mitra' className='text-h6 sm:text-h5 md:text-h4 w-[85px] md:w-[105px] font-light text-center' link='/partner'/>
        </div>
        <div className='p-1 sm:p-3 md:p-10 flex gap-[10px] md:gap-[15px] items-center h-full '>
            <NavLink link='/login' className='text-h6 md:text-h5 lg:text-h4 text-secondary font-bold' text='Masuk'/>
            <Button className='h-[30px] w-[65px] sm:h-[35px] sm:w-[70px] md:h-[40px] md:w-[100px] lg:h-[45px] lg:w-[130px] text-white lg:text-h4 md:text-h5 text-h6 rounded-[25px] font-bold flex justify-center items-center'>Daftar</Button>
        </div>
    </div>
  )
}

export default Header