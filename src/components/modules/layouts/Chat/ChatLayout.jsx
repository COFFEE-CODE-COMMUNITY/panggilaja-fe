import React, { useEffect, useState } from 'react'
import { FaSearch, FaArrowLeft } from 'react-icons/fa'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSellers, selectSellers, selectSellerStatus } from '../../../../features/sellerSlice'
import Input from '../../../common/Input'

const ChatLayout = () => {
  const [chatMobile, setChatMobile] = useState(false)
  const [searchContact, setSearchContact] = useState('')  
  
  const dispatch = useDispatch()
  const location = useLocation()

  const sellers = useSelector(selectSellers)
  const sellerStatus = useSelector(selectSellerStatus)

  let searchSellerResult = []
  if(searchContact){
    searchSellerResult = sellers?.data.filter((seller) => seller.nama_toko.includes(searchContact))
  }

  console.log(searchSellerResult)

  useEffect(() => {
      dispatch(getSellers())
  },[dispatch])

  if (sellerStatus === 'loading') {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='text-center'>
                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto'></div>
                <p className='mt-4 text-gray-600'>Memuat data...</p>
            </div>
        </div>
    )
  }

  return (
    <div className='h-full w-full flex'>
        <div className={`h-full px-[10px] py-[5px] sm:flex flex-col lg:gap-[20px] md:gap-[15px] ${chatMobile ? 'hidden' : ''}`}>
          <div className='relative flex items-center'>
            <FaSearch className='absolute left-3 text-gray-400'/>
            <Input 
              placeholder='Cari' 
              className='bg-gray-50 w-full rounded-[5px] px-[40px] placeholder:text-gray-400'
              onChange={(e) => setSearchContact(e.target.value)}
            />
          </div>
          <div className=' overflow-auto flex flex-col gap-[10px] sm:my-0 my-[15px]'>
            {!searchContact && 
              sellers?.data.map((contact) => (
                <NavLink 
                  onClick={() => setChatMobile(!chatMobile)}
                  className='hover:bg-gray-50/60'
                >
                  <div className='flex lg:gap-[20px] md:gap-[15px] gap-[10px] items-center lg:px-[15px] lg:py-[10px] px-[10px] py-[10px] '>
                    <img src={contact.foto_toko} alt="" className='w-[50px] h-[50px] bg-amber-100 rounded-full'/>
                    <div>
                      <p>{contact.nama_toko}</p>
                      <p className='font-extralight'>hai</p>
                    </div>
                  </div>
                </NavLink>
            ))}
              
            {searchContact && 
              searchSellerResult?.map((contact) => (
                <NavLink 
                  onClick={() => setChatMobile(!chatMobile)}
                  className='hover:bg-gray-50/60'
                >
                  <div className='flex lg:gap-[20px] md:gap-[15px] gap-[10px] items-center lg:px-[15px] lg:py-[10px] px-[10px] py-[10px] '>
                    <img src={contact.foto_toko} alt="" className='w-[50px] h-[50px] bg-amber-100 rounded-full'/>
                    <div>
                      <p>{contact.nama_toko}</p>
                      <p className='font-extralight'>hai</p>
                    </div>
                  </div>
                </NavLink>
            ))}
            
          </div>
        </div>
        <div className={`sm:flex flex-col w-full ${chatMobile ? '' : 'hidden'}`}>
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
          <div className='w-full bg-chat/25 flex flex-col relative flex-1 h-full'>
            <div className='w-full flex-1'></div>
            <div className='w-full bg-white lg:px-[20px] lg:py-[10px] px-[15px] py-[5px]'>
              <Input placeholder='Pesan'/>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ChatLayout