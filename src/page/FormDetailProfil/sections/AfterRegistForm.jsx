import { useEffect, useState } from 'react'
import Button from '../../../components/common/Button'
import Input from '../../../components/common/Input'
import { useDispatch, useSelector } from 'react-redux'
import { addAddress, selectSelectedAdressStatus } from '../../../features/userSlice'
import { selectCurrentUser } from '../../../features/authSlice'
import { useNavigate } from 'react-router-dom'

const AfterRegistForm = () => {
    const user = useSelector(selectCurrentUser)

    const [provinsi, setProvinsi] = useState('')
    const [kota, setKota] = useState('')
    const [kecamatan, setKecamatan] = useState('')
    const [kode_pos, setKode_Pos] = useState('')
    const [alamat, setAlamat] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const form = useSelector(selectSelectedAdressStatus)
    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            alamat,
            provinsi,
            kota,
            kecamatan,
            kode_pos
        }

        dispatch(addAdress({
            id: user.id_buyer,
            data 
        }))
    } 

    useEffect(() => {
        if(form === 'success'){
            navigate('/')
        }
    },[form])

  return (
    <form className='flex flex-col gap-[15px] px-[15px]' onSubmit={handleSubmit}>
        <div className='flex'>
            <label className='lg:text-h4 md:text-h5 text-h6 w-[250px] font-light'>Alamat</label>
            <div className='flex gap-[10px] w-full'>
                <select 
                    className='border-2 border-gray-200 px-[10px] py-[5px] rounded-[35px] bg-white'
                    onChange={(e) => setProvinsi(e.target.value)}
                    value={provinsi}
                >
                    <option value="" disabled>Provinsi</option>
                    <option value="jawa-barat">Jawa Barat</option>
                </select>
                <select 
                    className='border-2 border-gray-200 px-[10px] py-[5px] rounded-[35px] bg-white'
                    onChange={(e) => setKota(e.target.value)}   
                    value={kota} 
                >
                    <option value="" disabled>Kota</option>
                    <option value="bandung">Bandung</option>
                </select>
                <select 
                    className='border-2 border-gray-200 px-[10px] py-[5px] rounded-[35px] bg-white'
                    onChange={(e) => setKecamatan(e.target.value)}
                    value={kecamatan}
                >
                    <option value="kecamatan">Kecamatan</option>
                    <option value="coblong">Coblong</option>
                </select>
                <Input 
                    placeholder='Kode pos' 
                    className='border-2 border-gray-200 rounded-[35px]'
                    onChange={(e) => setKode_Pos(e.target.value)}
                    value={kode_pos}
                ></Input>
            </div>
        </div>
        <div className='flex'>
            <label htmlFor="detailAddress" className='w-[250px] font-light'>Detail Alamat</label>
            <textarea 
                name="detailAdress" 
                id="detailAdress" 
                placeholder='Masukkan detail alamat' 
                className='w-full h-[150px] bg-white p-[10px] rounded-[15px] border-2 border-gray-200'
                onChange={(e) => setAlamat(e.target.value) }
                value={alamat}
            ></textarea>
        </div>
        <div className='w-full text-right'>
            <Button variant='primary' className='text-white px-[10px] py-[5px] rounded-[35px]'>Selesai</Button>
        </div>
    </form>
  )
}

export default AfterRegistForm