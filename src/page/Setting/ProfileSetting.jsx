import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../features/authSlice'

const ProfileSetting = () => {
    const user = useSelector(selectCurrentUser)
  return (
    <div className='px-[10px] py-[5px] flex flex-col gap-[20px]'>
        <div>
            <p className='lg:text-h3 md:text-h4 text-h5 font-medium'>Profil Saya</p>
            <p className='font-light md:text-h5 text-h6 '>Ini adalah akun Konsumen</p>
        </div>

        <div className='w-full lg:px-[20px] lg:py-[25px] px-[20px] py-[15px] flex flex-col lg:gap-[20px] md:gap-[15px] gap-[10px] border-1 border-gray-50 shadow-sm rounded-[15px]'>
            <p className='font-medium'>Akun</p>
            <div className='w-full flex lg:flex-row flex-col lg:gap-[50px] gap-[10px] lg:items-center '>
                <img alt="" className='w-[100px] h-[100px] rounded-full bg-amber-200'/>
                <div className='flex flex-col gap-[10px]'>
                    <div className='flex flex-col'>
                        <p className='font-light'>Username</p>
                        <p>{user.username}</p>
                    </div>
                    <div className='flex flex-col'>
                        <p className='font-light'>Email</p>
                        <p>{user.email}</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default ProfileSetting