import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaEdit, FaUser, FaEnvelope, FaMapMarkerAlt, FaCity, FaBuilding, FaMailBulk } from 'react-icons/fa'
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
    console.log(address)
    useEffect(() => {
        if (user?.id_buyer && statusProfile === 'idle') {
            dispatch(seeProfile(user.id_buyer))
        }
    }, [statusProfile, dispatch, user?.id_buyer, statusUpdate, profile])

    useEffect(() => {
        if (user?.id_buyer && statusAddress === 'idle') {
            dispatch(seeAddress(user.id_buyer))
        }
    }, [dispatch, user?.id_buyer, statusAddress, address?.data])

    return (
        <div className='w-full animate-fade-in'>
            {/* header */}
            <div className='flex items-center gap-4 mb-8'>
                <button
                    onClick={() => navigate('/setting')}
                    className='md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors'
                >
                    <FaArrowLeft className='text-gray-600' />
                </button>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900'>Profil Saya</h1>
                    <p className='text-gray-500 text-sm mt-1'>Kelola informasi profil dan alamat anda</p>
                </div>
            </div>

            {/* card */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
                {/* header profile */}
                <div className='p-6 sm:p-8 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white'>
                    <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6'>
                        <div className='flex items-center gap-6'>
                            <div className='relative'>
                                {profile?.foto_buyer ? (
                                    <img
                                        src={profile?.foto_buyer}
                                        className='w-24 h-24 rounded-full object-cover border-4 border-white shadow-md'
                                        alt="Profile"
                                    />
                                ) : (
                                    <div className='w-24 h-24 rounded-full flex items-center justify-center bg-primary text-white text-3xl font-bold border-4 border-white shadow-md'>
                                        {profile?.fullname ? profile.fullname[0].toUpperCase() : 'P'}
                                    </div>
                                )}
                            </div>
                            <div>
                                <h3 className='text-xl font-bold text-gray-900'>{profile?.fullname || user?.username || '-'}</h3>
                                <p className='text-gray-500 flex items-center gap-2 mt-1'>
                                    <FaEnvelope size={12} />
                                    {user?.email || '-'}
                                </p>
                            </div>
                        </div>

                        <Link to='/setting/edit'>
                            <button className='bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 hover:text-primary hover:border-primary/30 transition-all shadow-sm flex items-center gap-2 font-medium text-sm'>
                                <FaEdit size={14} />
                                <span>Edit Profil</span>
                            </button>
                        </Link>
                    </div>
                </div>

                {/* grid detail */}
                <div className='p-6 sm:p-8 grid md:grid-cols-2 gap-x-12 gap-y-10'>

                    {/* info akun */}
                    <div className='space-y-6'>
                        <div className='flex items-center gap-2 pb-2 border-b border-gray-100'>
                            <FaUser className='text-primary' />
                            <h2 className='font-semibold text-gray-900'>Informasi Akun</h2>
                        </div>

                        <div className='space-y-5'>
                            <div>
                                <p className='text-xs font-medium text-gray-500 uppercase tracking-wider mb-1'>Username</p>
                                <p className='font-medium text-gray-900'>{user?.username || '-'}</p>
                            </div>

                            <div>
                                <p className='text-xs font-medium text-gray-500 uppercase tracking-wider mb-1'>Nama Lengkap</p>
                                <p className='font-medium text-gray-900'>{profile?.fullname || '-'}</p>
                            </div>

                            <div>
                                <p className='text-xs font-medium text-gray-500 uppercase tracking-wider mb-1'>Email</p>
                                <p className='font-medium text-gray-900'>{user?.email || '-'}</p>
                            </div>
                        </div>
                    </div>

                    {/* detail alamat */}
                    <div className='space-y-6'>
                        <div className='flex items-center gap-2 pb-2 border-b border-gray-100'>
                            <FaMapMarkerAlt className='text-primary' />
                            <h2 className='font-semibold text-gray-900'>Detail Alamat</h2>
                        </div>

                        {address && address.data ? (
                            <div className='space-y-5'>
                                <div>
                                    <p className='text-xs font-medium text-gray-500 uppercase tracking-wider mb-1'>Alamat Lengkap</p>
                                    <p className='font-medium text-gray-900'>{address.data.alamat || '-'}</p>
                                </div>

                                <div className='grid grid-cols-2 gap-6'>
                                    <div>
                                        <p className='text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1'>
                                            <FaBuilding size={10} /> Provinsi
                                        </p>
                                        <p className='font-medium text-gray-900'>{address.data.provinsi || '-'}</p>
                                    </div>
                                    <div>
                                        <p className='text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1'>
                                            <FaCity size={10} /> Kota
                                        </p>
                                        <p className='font-medium text-gray-900'>{address.data.kota || '-'}</p>
                                    </div>
                                </div>

                                <div className='grid grid-cols-2 gap-6'>
                                    <div>
                                        <p className='text-xs font-medium text-gray-500 uppercase tracking-wider mb-1'>Kecamatan</p>
                                        <p className='font-medium text-gray-900'>{address.data.kecamatan || '-'}</p>
                                    </div>
                                    <div>
                                        <p className='text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1'>
                                            <FaMailBulk size={10} /> Kode Pos
                                        </p>
                                        <p className='font-medium text-gray-900'>{address.data.kode_pos || '-'}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className='bg-gray-50 rounded-lg p-4 text-center border border-dashed border-gray-300'>
                                <p className='text-gray-500 text-sm mb-2'>Alamat belum diatur</p>
                                <Link to='/setting/edit' className='text-primary text-sm font-medium hover:underline'>
                                    Tambah Alamat Sekarang
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileSetting