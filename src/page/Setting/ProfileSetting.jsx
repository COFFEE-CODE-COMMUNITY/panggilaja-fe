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
        <div className='lg:p-8 md:p-6 p-4 w-full'> 
            <div className='w-full lg:max-w-6xl mx-auto'>
                {/* Header */}
                <div className='flex items-center gap-4 mb-6'>
                    <FaArrowLeft 
                        className='text-gray-500 sm:hidden block cursor-pointer hover:text-gray-900 text-sm'
                        onClick={() => navigate('/setting')}
                    />
                    <h1 className='lg:text-h3 md:text-h4 text-h5 font-medium'>Profil Saya</h1>
                </div>

                {/* card */}
                <div className='relative p-6 bg-white rounded-xl shadow-lg'>
                    
                    <Link to='/setting/edit' className='hidden sm:block absolute top-6 right-6 z-10'>
                        <button className='bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity shadow-sm flex items-center gap-2 font-medium cursor-pointer'>
                            <FaEdit size={14} />
                            <span className='hidden sm:inline'>Edit Profil</span>
                        </button>
                    </Link>

                    {/* header */}
                    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 pb-4 border-b border-gray-200'>
                        
                        {/* profile image */}
                        <div className='flex items-center gap-4 mb-4 sm:mb-0'>
                            {profile?.foto_buyer ? (
                                <img 
                                    src={profile?.foto_buyer} 
                                    className='w-24 h-24 rounded-full object-cover border-2 border-gray-200 shadow'
                                    alt="Profile"
                                />
                            ) : (
                                <div className='w-24 h-24 rounded-full flex items-center justify-center bg-blue-500 text-white text-4xl font-bold border-2 border-blue-600 shadow'>
                                    {profile?.fullname ? profile.fullname[0].toUpperCase() : 'P'}
                                </div>
                            )}

                            {/* nama dan email */}
                            <div>
                                <h3 className='text-xl font-bold'>{profile?.fullname || user?.username || '-'}</h3>
                                <p className='text-gray-600 text-sm'>{user?.email || '-'}</p>
                            </div>
                        </div>

                        {/* button edit mobile */}
                        <Link to='/setting/edit' className='block sm:hidden'>
                            <button className='w-full bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity shadow-md flex items-center justify-center gap-2 font-medium cursor-pointer'>
                                <FaEdit size={14} />
                                <span>Edit Profil</span>
                            </button>
                        </Link>
                    </div>

                    {/* detail profile */}
                    <div className='md:grid md:grid-cols-2 gap-x-12 gap-y-8'>
                        
                        <div className='space-y-4 mb-6 md:mb-0'> 
                            <h2 className='font-semibold text-lg border-b pb-2 border-gray-300'>Informasi Akun</h2>
                            
                            {/* konten */}
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

                        {/* alamat */}
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
        </div>
    )
}

export default ProfileSetting