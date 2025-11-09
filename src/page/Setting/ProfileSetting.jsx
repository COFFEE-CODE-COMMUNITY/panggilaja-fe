import React, { useEffect, useState } from 'react'
// Pastikan path ke userSlice benar
import { FaEdit } from 'react-icons/fa'
import EditProfile from './EditProfile'
import { selectCurrentUser } from '../../features/authSlice'
import { seeAddress, seeProfile, selectSeeAddress, selectSeeAddressStatus, selectSeeProfile, selectSeeProfileStatus, selectUpdateProfileStatus } from '../../features/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const ProfileSetting = () => {
    const user = useSelector(selectCurrentUser)
    const dispatch = useDispatch()
    
    const profile = useSelector(selectSeeProfile)
    const statusProfile = useSelector(selectSeeProfileStatus)
    const statusUpdate = useSelector(selectUpdateProfileStatus)

    const address = useSelector(selectSeeAddress)
    const statusAddress = useSelector(selectSeeAddressStatus)
    
    const [editModal, setEditModal] = useState(false)

    useEffect(() => {
        if (user?.id_buyer && statusProfile === 'idle') {
            dispatch(seeProfile(user.id_buyer))
        }
    },[statusProfile, dispatch, user?.id_buyer, statusUpdate, profile])

    useEffect(() => {
        if (user?.id_buyer && statusAddress === 'idle') { 
            dispatch(seeAddress(user.id_buyer))
        }
    }, [dispatch, user?.id_buyer, statusAddress, address?.data])
    
    return (
        <div className='px-[10px] py-[5px] flex flex-col gap-[20px]'>
            <div>
                <p className='lg:text-h3 md:text-h4 text-h5 font-medium'>Profil Saya</p>
                <p className='font-light md:text-h5 text-h6 '>Ini adalah akun Konsumen</p>
            </div>

            <div className='w-full lg:px-[20px] lg:py-[25px] px-[20px] py-[15px] flex flex-col lg:gap-[20px] md:gap-[15px] gap-[10px] rounded-[15px] relative'>
                <p className='font-medium'>Detail Akun & Alamat</p>
                <div className='w-full flex lg:flex-row flex-col lg:gap-[50px] gap-[10px] lg:items-center h-full'>
                    <div className='flex flex-col gap-[10px] flex-1'>
                        <div className='w-full flex justify-center'>
                            <img src={profile?.foto_buyer} className='w-[100px] h-[100px] rounded-full object-cover border-2 border-gray-100 shadow-md'/>
                        </div>
                        
                        {/* Data Akun */}
                        <div className='flex flex-col'>
                            <p className='font-light text-sm text-gray-600'>Username</p>
                            <p className='font-medium'>{user?.username || '-'}</p>
                        </div>
                        <div className='flex flex-col'>
                            <p className='font-light text-sm text-gray-600'>Nama Lengkap</p>
                            <p className='font-medium'>{profile?.fullname || '-'}</p>
                        </div>
                        <div className='flex flex-col'>
                            <p className='font-light text-sm text-gray-600'>Email</p>
                            <p className='font-medium'>{user?.email || '-'}</p>
                        </div>
                        
                        <div className='border-t border-gray-200 my-4'></div>
                        
                        {/* Data Alamat */}
                        <p className='font-medium text-gray-700'>Detail Alamat</p>

                        {address && address.data ? (
                            <>
                                <div className='flex flex-col'>
                                    <p className='font-light text-sm text-gray-600'>Alamat Lengkap</p>
                                    <p className='font-medium'>{address.data.alamat || '-'}</p>
                                </div>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div className='flex flex-col'>
                                        <p className='font-light text-sm text-gray-600'>Provinsi</p>
                                        <p className='font-medium'>{address.data.provinsi || '-'}</p>
                                    </div>
                                    <div className='flex flex-col'>
                                        <p className='font-light text-sm text-gray-600'>Kota</p>
                                        <p className='font-medium'>{address.data.kota || '-'}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div className='flex flex-col'>
                                        <p className='font-light text-sm text-gray-600'>Kecamatan</p>
                                        <p className='font-medium'>{address.data.kecamatan || '-'}</p>
                                    </div>
                                    <div className='flex flex-col'>
                                        <p className='font-light text-sm text-gray-600'>Kode Pos</p>
                                        <p className='font-medium'>{address.data.kode_pos || '-'}</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className='text-gray-500 italic'>
                                Alamat belum diatur. Silakan edit profil untuk menambahkannya.
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Tombol Edit */}
                <Link to='edit'>
                    <FaEdit 
                        className='absolute top-5 right-5 cursor-pointer text-gray-600 hover:text-[#3A573F] transition-colors'
                        size={20}
                    />
                </Link>
            </div>
        </div>
    )
}

export default ProfileSetting