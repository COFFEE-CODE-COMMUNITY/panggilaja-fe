import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser } from '../../features/authSlice'
import { seeAddress, seeProfile, selectSeeAddress, selectSeeAddressStatus, selectSeeProfile, selectSeeProfileStatus } from '../../features/userSlice' 
import { FaEdit } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ProfileSetting = () => {
    const user = useSelector(selectCurrentUser)
    const dispatch = useDispatch()
    
    const profile = useSelector(selectSeeProfile)
    const statusProfile = useSelector(selectSeeProfileStatus)

    const address = useSelector(selectSeeAddress)
    const statusAddress = useSelector(selectSeeAddressStatus)
    
    useEffect(() => {
        if (user?.id_buyer && statusProfile === 'idle' && !profile) {
            dispatch(seeProfile(user.id_buyer))
        }
    },[statusProfile, dispatch, user?.id_buyer])

    useEffect(() => {
        // 1. Pastikan user.id_buyer sudah tersedia
        // 2. Pastikan status masih 'idle' (belum pernah mencoba mengambil) atau ingin refresh jika data belum ada (!address)
        if (user?.id_buyer && statusAddress === 'idle' && !address) { 
            // URL yang dikirim ke service sekarang pasti berisi ID yang valid
            dispatch(seeAddress(user.id_buyer))
        }
    // Masukkan id_buyer sebagai dependency, agar effect berjalan HANYA SETELAH id_buyer terisi
    // Masukkan statusAddress agar dispatch hanya dilakukan saat 'idle' atau butuh refresh
    }, [dispatch, user?.id_buyer, statusAddress, address])

    if (statusAddress === 'loading') {
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
        <div className='px-[10px] py-[5px] flex flex-col gap-[20px]'>
            <div>
                <p className='lg:text-h3 md:text-h4 text-h5 font-medium'>Profil Saya</p>
                <p className='font-light md:text-h5 text-h6 '>Ini adalah akun Konsumen</p>
            </div>

            <div className='w-full lg:px-[20px] lg:py-[25px] px-[20px] py-[15px] flex flex-col lg:gap-[20px] md:gap-[15px] gap-[10px] border-1 border-gray-50 shadow-sm rounded-[15px] relative'>
                <p className='font-medium'>Akun</p>
                <div className='w-full flex lg:flex-row flex-col lg:gap-[50px] gap-[10px] lg:items-center h-full'>
                    <div className='flex flex-col gap-[10px] flex-1'>
                        <div className='w-full flex justify-center'>
                            <div className='relative'>
                                <FaEdit 
                                    className='absolute top-0 right-0 cursor-pointer text-gray-600 hover:text-primary transition-colors'
                                    size={20}
                                />
                                <img src={profile?.foto_buyer} alt="" className='w-[100px] h-[100px] rounded-full '/>
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <p className='font-light text-sm text-gray-600'>Username</p>
                            <p className='font-medium'>{user?.username || '-'}</p>
                        </div>
                        <div className='flex flex-col'>
                            <p className='font-light text-sm text-gray-600'>Full Name</p>
                            <p className='font-medium'>{profile?.fullname || '-'}</p>
                        </div>
                        <div className='flex flex-col'>
                            <p className='font-light text-sm text-gray-600'>Email</p>
                            <p className='font-medium'>{user?.email || '-'}</p>
                        </div>
                        
                        <div className='border-t border-gray-200 my-2'></div>
                        
                        {address && address.data ? (
                            <>
                                <div className='flex flex-col'>
                                    <p className='font-light text-sm text-gray-600'>Provinsi</p>
                                    <p className='font-medium'>{address.data.provinsi || '-'}</p>
                                </div>
                                <div className='flex flex-col'>
                                    <p className='font-light text-sm text-gray-600'>Kota</p>
                                    <p className='font-medium'>{address.data.kota || '-'}</p>
                                </div>
                                <div className='flex flex-col'>
                                    <p className='font-light text-sm text-gray-600'>Kecamatan</p>
                                    <p className='font-medium'>{address.data.kecamatan || '-'}</p>
                                </div>
                                <div className='flex flex-col'>
                                    <p className='font-light text-sm text-gray-600'>Kode Pos</p>
                                    <p className='font-medium'>{address.data.kode_pos || '-'}</p>
                                </div>
                            </>
                        ) : (
                            <div className='text-gray-500 italic'>
                                Alamat belum diatur
                            </div>
                        )}
                    </div>
                </div>
                
                <Link to='edit'>
                    <FaEdit 
                        className='absolute top-5 right-5 cursor-pointer text-gray-600 hover:text-primary transition-colors'
                        size={20}
                    />
                </Link>
            </div>

        </div>
    )
}

export default ProfileSetting