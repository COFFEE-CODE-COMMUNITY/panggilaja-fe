import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaEdit } from 'react-icons/fa'
import EditProfile from './EditProfile'
import { selectCurrentUser } from '../../features/authSlice'
import { seeAddress, seeProfile, selectSeeAddress, selectSeeAddressStatus, selectSeeProfile, selectSeeProfileStatus, selectUpdateProfileStatus } from '../../features/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'


const ProfileSetting = () => {
    const user = useSelector(selectCurrentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

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
        <div className='lg:p-4 md:p-3 p-1 max-w-xl'>
            <div className='max-w-2xl mx-auto'>
                {/* Header */}
                <div className='flex items-center gap-4 mb-6'>
                    <FaArrowLeft 
                        className='text-gray-500 sm:hidden block cursor-pointer hover:text-gray-900 text-sm'
                        onClick={() => navigate('/setting')}
                    />
                    <h1 className='lg:text-h3 md:text-h4 text-h5 font-medium'>Profil Saya</h1>
                </div>

                {/* Card */}
                <div className='relative'>
                    {/* Tombol Edit */}
                    <Link to='/setting/edit'>
                        <button className='absolute top-0 right-4 bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all shadow-sm flex items-center gap-2 font-medium cursor-pointer'>
                            <FaEdit size={14} />
                            <span className='hidden sm:inline'>Edit Profil</span>
                        </button>
                    </Link>

                    {/* Profile Image */}
                    <div className='flex justify-center mb-6'>
                        <img 
                            src={profile?.foto_buyer} 
                            className='w-24 h-24 rounded-full object-cover border-2 border-gray-200 shadow'
                            alt="Profile"
                        />
                    </div>

                    {/* Informasi Akun */}
                    <div className='space-y-4 mb-6'>
                        <h2 className='font-semibold text-lg border-b pb-2 border-gray-300'>Informasi Akun</h2>
                        
                        <div>
                            <p className='text-sm text-gray-500'>Username</p>
                            <p className='font-medium'>{user?.username || '-'}</p>
                        </div>
                        
                        <div>
                            <p className='text-sm text-gray-500'>Nama Lengkap</p>
                            <p className='font-medium'>{profile?.fullname || '-'}</p>
                        </div>
                        
                        <div>
                            <p className='text-sm text-gray-500'>Email</p>
                            <p className='font-medium'>{user?.email || '-'}</p>
                        </div>
                    </div>

                    {/* Informasi Alamat */}
                    <div className='space-y-4'>
                        <h2 className='font-semibold text-lg border-b pb-2 border-gray-300'>Detail Alamat</h2>

                        {address && address.data ? (
                            <>
                                <div>
                                    <p className='text-sm text-gray-500'>Alamat Lengkap</p>
                                    <p className='font-medium'>{address.data.alamat || '-'}</p>
                                </div>
                                
                                <div className='grid grid-cols-2 gap-4'>
                                    <div>
                                        <p className='text-sm text-gray-500'>Provinsi</p>
                                        <p className='font-medium'>{address.data.provinsi || '-'}</p>
                                    </div>
                                    <div>
                                        <p className='text-sm text-gray-500'>Kota</p>
                                        <p className='font-medium'>{address.data.kota || '-'}</p>
                                    </div>
                                </div>
                                
                                <div className='grid grid-cols-2 gap-4'>
                                    <div>
                                        <p className='text-sm text-gray-500'>Kecamatan</p>
                                        <p className='font-medium'>{address.data.kecamatan || '-'}</p>
                                    </div>
                                    <div>
                                        <p className='text-sm text-gray-500'>Kode Pos</p>
                                        <p className='font-medium'>{address.data.kode_pos || '-'}</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <p className='text-gray-500 text-sm italic'>
                                Alamat belum diatur. Silakan edit profil untuk menambahkannya.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileSetting