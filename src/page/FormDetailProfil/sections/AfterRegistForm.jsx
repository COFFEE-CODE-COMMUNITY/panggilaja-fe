import { useEffect, useState } from 'react'
import Button from '../../../components/common/Button'
import Input from '../../../components/common/Input'
import { useDispatch, useSelector } from 'react-redux'
import { 
    addAddress as addAddressAction, 
    selectSeeAddress, 
    selectSeeAddressStatus, 
    selectAddAddressStatus, 
    seeAddress, 
    selectAddAddress 
} from '../../../features/userSlice'
import { selectCurrentUser } from '../../../features/authSlice'
import { useNavigate } from 'react-router-dom'

const AfterRegistForm = () => {
    const user = useSelector(selectCurrentUser)
    const address = useSelector(selectSeeAddress)
    const addressStatus = useSelector(selectSeeAddressStatus)
    const addAddressStatus = useSelector(selectAddAddressStatus)
    const addedAddress = useSelector(selectAddAddress) // ✅ Rename untuk clarity
    const dispatch = useDispatch()
    const navigate = useNavigate()

    console.log(user)

    console.log('🔍 Current state:', {
        user,
        address,
        addressStatus,
        addAddressStatus,
        addedAddress
    })

    const [provinsi, setProvinsi] = useState('')
    const [kota, setKota] = useState('')
    const [kecamatan, setKecamatan] = useState('')
    const [kode_pos, setKode_Pos] = useState('')
    const [alamat, setAlamat] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (user?.id_buyer) {
            console.log('📡 Fetching address for buyer:', user.id_buyer)
            dispatch(seeAddress(user.id_buyer))
        }
    }, [dispatch, user?.id_buyer])

    useEffect(() => {
        console.log('🔄 Check redirect:', {
            address,
            addressStatus,
            hasProvinsi: address?.data?.provinsi,
            hasAlamat: address?.data?.alamat
        })

        if (addressStatus === 'loading') {
            return
        }

        if (address?.data?.provinsi || address?.data?.alamat) {
            console.log('✅ User sudah punya alamat, redirect ke home')
            navigate('/', { replace: true })
        } else {
            console.log('📝 User belum punya alamat, tampilkan form')
        }
    }, [address, addressStatus, navigate])

    useEffect(() => {
        console.log('⚡ Status changed:', {
            isSubmitting,
            addAddressStatus,
            addedAddress
        })

        if (isSubmitting && addAddressStatus === 'success') {
            console.log('✅ Alamat berhasil ditambahkan!')
            
            dispatch(seeAddress(user.id_buyer))
            
            setTimeout(() => {
                navigate('/', { replace: true })
            }, 1000)
        }
        
        if (addAddressStatus === 'error') {
            console.error('❌ Gagal menambahkan alamat')
            setIsSubmitting(false)
        }
    }, [addAddressStatus, isSubmitting, navigate, dispatch, user?.id_buyer])

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log('📤 Form submitted:', {
            provinsi,
            kota,
            kecamatan,
            kode_pos,
            alamat
        })

        if (!provinsi || !kota || !kecamatan || !kode_pos || !alamat) {
            alert('Mohon lengkapi semua field!')
            return
        }

        const data = {
            alamat,
            provinsi,
            kota,
            kecamatan,
            kode_pos
        }
        
        console.log('🚀 Dispatching addAddress with:', {
            id: user.id_buyer,
            data
        })
        
        setIsSubmitting(true)
        
        dispatch(addAddressAction({ id: user.id_buyer, data }))
    }

    // Loading state
    if (addressStatus === 'loading') {
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
        <div className='flex items-center justify-center p-4 outline-1 outline-gray-300 rounded-[25px]'>
            <div className='w-full max-w-3xl bg-white rounded-lg p-8'>
                <div className='mb-6'>
                    <h1 className='text-2xl font-semibold mb-2'>Lengkapi Data Alamat</h1>
                    <p className='text-gray-600'>Isi alamat lengkap Anda untuk melanjutkan</p>
                </div>

                <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
                    <div className='flex flex-col lg:flex-row lg:items-start gap-4'>
                        <label className='text-lg w-full lg:w-[200px] font-medium'>
                            Lokasi
                        </label>
                        <div className='flex flex-col gap-3 w-full'>
                            <select 
                                className='border-1 border-gray-200 px-4 py-3 rounded-lg bg-white w-full focus:border-blue-500 focus:outline-none'
                                onChange={(e) => setProvinsi(e.target.value)}
                                value={provinsi}
                                required
                            >
                                <option value="">Pilih Provinsi</option>
                                <option value="jawa-barat">Jawa Barat</option>
                                <option value="jawa-tengah">Jawa Tengah</option>
                                <option value="jawa-timur">Jawa Timur</option>
                            </select>
                            <select 
                                className='border-1 border-gray-200 px-4 py-3 rounded-lg bg-white w-full focus:border-blue-500 focus:outline-none'
                                onChange={(e) => setKota(e.target.value)}   
                                value={kota}
                                required
                                disabled={!provinsi}
                            >
                                <option value="">Pilih Kota</option>
                                <option value="bandung">Bandung</option>
                                <option value="jakarta">Jakarta</option>
                                <option value="surabaya">Surabaya</option>
                            </select>
                            
                            <select 
                                className='border-1 border-gray-200 px-4 py-3 rounded-lg bg-white w-full focus:border-blue-500 focus:outline-none'
                                onChange={(e) => setKecamatan(e.target.value)}
                                value={kecamatan}
                                required
                                disabled={!kota}
                            >
                                <option value="">Pilih Kecamatan</option>
                                <option value="coblong">Coblong</option>
                                <option value="cicendo">Cicendo</option>
                            </select>
                            
                            <Input 
                                placeholder='Kode Pos (contoh: 40132)' 
                                className='border-1 border-gray-200 rounded-lg w-full px-4 py-3 focus:border-blue-500 focus:outline-none'
                                onChange={(e) => setKode_Pos(e.target.value)}
                                value={kode_pos}
                                required
                            />
                        </div>
                    </div>

                    <div className='flex flex-col lg:flex-row lg:items-start gap-4'>
                        <label htmlFor="detailAddress" className='text-lg w-full lg:w-[200px] font-medium'>
                            Detail Alamat 
                        </label>
                        <textarea 
                            name="detailAdress" 
                            id="detailAdress" 
                            placeholder='Contoh: Jl. Merdeka No. 123, RT 001/RW 005, Kelurahan Dago' 
                            className='w-full h-[120px] bg-white p-4 rounded-lg border-1 border-gray-200 focus:border-blue-500 focus:outline-none resize-none'
                            onChange={(e) => setAlamat(e.target.value)}
                            value={alamat}
                            required
                            minLength={10}
                        ></textarea>
                    </div>

                    {addAddressStatus === 'error' && (
                        <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg'>
                            ❌ Gagal menyimpan alamat. Silakan coba lagi.
                        </div>
                    )}

                    {addAddressStatus === 'success' && (
                        <div className='bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg'>
                            ✅ Alamat berhasil disimpan! Mengalihkan...
                        </div>
                    )}

                    <div className='flex justify-end gap-3 pt-4'>
                        <Button 
                            variant='primary' 
                            type='submit'
                            className='text-white px-8 py-3 rounded-[35px] disabled:opacity-50 disabled:cursor-not-allowed'
                            disabled={addAddressStatus === 'loading'}
                        >
                            {addAddressStatus === 'loading' ? (
                                <span className='flex items-center gap-2'>
                                    <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
                                    Menyimpan...
                                </span>
                            ) : (
                                'Simpan & Lanjutkan'
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AfterRegistForm