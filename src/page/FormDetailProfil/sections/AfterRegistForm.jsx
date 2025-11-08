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
import { selectAccessToken, selectCurrentUser } from '../../../features/authSlice'
import { useNavigate } from 'react-router-dom'

import { 
    fetchProvinces,
    fetchRegencies,
    fetchDistricts,
    selectAllProvinces,
    selectAllRegencies,
    selectAllDistricts,
    selectAlamatStatus,
    resetRegencies, 
    resetDistricts, 
} from '../../../features/addressSlice'


const AfterRegistForm = () => {
    const user = useSelector(selectCurrentUser)
    const token = useSelector(selectAccessToken)
    const address = useSelector(selectSeeAddress)
    const addressStatus = useSelector(selectSeeAddressStatus)
    const addAddressStatus = useSelector(selectAddAddressStatus)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const provinces = useSelector(selectAllProvinces)
    const regencies = useSelector(selectAllRegencies)
    const districts = useSelector(selectAllDistricts)
    const alamatStatus = useSelector(selectAlamatStatus)

    const [provinsiCode, setProvinsiCode] = useState('')
    const [kotaCode, setKotaCode] = useState('')
    const [kecamatanCode, setKecamatanCode] = useState('')
    
    const [kode_pos, setKode_Pos] = useState('')
    const [alamat, setAlamat] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (provinces.length === 0 && alamatStatus === 'idle') {
            dispatch(fetchProvinces())
        }
    }, [dispatch, provinces.length, alamatStatus])

    useEffect(() => {
        if (user?.id_buyer && token) {
            dispatch(seeAddress(user?.id_buyer))
        }
    }, [dispatch, user?.id_buyer, token])

    useEffect(() => {
        if (addressStatus === 'loading') {
            return
        }
        if (address?.data?.provinsi || address?.data?.alamat) {
            navigate('/', { replace: true })
        }
    }, [address, addressStatus, navigate])
    
    useEffect(() => {
        if (isSubmitting && addAddressStatus === 'success') {
            dispatch(seeAddress(user?.id_buyer))
            
            setTimeout(() => {
                navigate('/', { replace: true })
            }, 1000)
        }
        
        if (addAddressStatus === 'error') {
            console.error('❌ Gagal menambahkan alamat')
            setIsSubmitting(false)
        }
    }, [addAddressStatus, isSubmitting, navigate, dispatch, user?.id_buyer])

    const handleProvinceChange = (e) => {
        const code = e.target.value
        setProvinsiCode(code) 
        setKotaCode('')
        setKecamatanCode('')
        dispatch(resetRegencies())

        if (code) {
            dispatch(fetchRegencies(code))
        }
    }

    const handleRegencyChange = (e) => {
        const code = e.target.value
        setKotaCode(code) 
        setKecamatanCode('') 
        dispatch(resetDistricts()) 

        if (code) {
            dispatch(fetchDistricts(code))
        }
    }
    
    const handleDistrictChange = (e) => {
        const code = e.target.value
        setKecamatanCode(code)
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        if (!provinsiCode || !kotaCode || !kecamatanCode || !kode_pos || !alamat) {
            alert('Mohon lengkapi semua field!')
            return
        }
        
        const provinsiName = provinces.find(p => p.code === provinsiCode)?.name || provinsiCode;
        const kotaName = regencies.find(r => r.code === kotaCode)?.name || kotaCode;
        const kecamatanName = districts.find(d => d.code === kecamatanCode)?.name || kecamatanCode;
        
        const data = {
            alamat,
            provinsi: provinsiName, 
            kota: kotaName,
            kecamatan: kecamatanName,
            kode_pos
        }
        
        setIsSubmitting(true)
        
        dispatch(addAddressAction({ id: user?.id_buyer, data }))
    }

    if (addressStatus === 'loading' || alamatStatus === 'loading') {
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <div className='text-center'>
                    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto'></div>
                    <p className='mt-4 text-gray-600'>Memuat data alamat...</p>
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
                                onChange={handleProvinceChange}
                                value={provinsiCode} 
                                required
                                disabled={alamatStatus === 'loading' && provinces.length === 0}
                            >
                                <option value="">
                                    {provinces.length === 0 && alamatStatus === 'loading' ? 'Memuat Provinsi...' : 'Pilih Provinsi'}
                                </option>
                                {provinces.map((p) => (
                                    <option key={p.code} value={p.code}>{p.name}</option>
                                ))}
                            </select>

                            <select 
                                className='border-1 border-gray-200 px-4 py-3 rounded-lg bg-white w-full focus:border-blue-500 focus:outline-none'
                                onChange={handleRegencyChange}  
                                value={kotaCode} 
                                required
                                disabled={!provinsiCode || (alamatStatus === 'loading' && regencies.length === 0)}
                            >
                                <option value="">
                                    {provinsiCode && regencies.length === 0 && alamatStatus === 'loading' ? 'Memuat Kota/Kabupaten...' : 'Pilih Kota/Kabupaten'}
                                </option>
                                {regencies.map((r) => (
                                    <option key={r.code} value={r.code}>{r.name}</option>
                                ))}
                            </select>
                            
                            <select 
                                className='border-1 border-gray-200 px-4 py-3 rounded-lg bg-white w-full focus:border-blue-500 focus:outline-none'
                                onChange={handleDistrictChange}
                                value={kecamatanCode} 
                                required
                                disabled={!kotaCode || (alamatStatus === 'loading' && districts.length === 0)}
                            >
                                <option value="">
                                    {kotaCode && districts.length === 0 && alamatStatus === 'loading' ? 'Memuat Kecamatan...' : 'Pilih Kecamatan'}
                                </option>
                                {districts.map((d) => (
                                    <option key={d.code} value={d.code}>{d.name}</option>
                                ))}
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