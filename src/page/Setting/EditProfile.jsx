import React, { useEffect, useState } from 'react'
import InputForm from '../../components/modules/form/InputForm'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { useDispatch, useSelector } from 'react-redux'
import { seeAddress, selectSeeAddress, selectSeeAddressStatus } from '../../features/userSlice'
import { selectCurrentUser } from '../../features/authSlice'

const EditProfile = () => {
    const [provinsi, setProvinsi] = useState('')
    const [kota, setKota] = useState('')
    const [kecamatan, setKecamatan] = useState('')
    const [kode_pos, setKode_Pos] = useState('')
    const [alamat, setAlamat] = useState('')

    const dispatch = useDispatch()

    const address = useSelector(selectSeeAddress)
    const user = useSelector(selectCurrentUser)
    const statusAddress = useSelector(selectSeeAddressStatus)
    
    useEffect(() => {
        if(!address){
            dispatch(seeAddress(user.id_buyer))
        }
    },[statusAddress])

    console.log(address)
    
    if(statusAddress === 'loading'){
        return (
            <div>
                loading...
            </div>
        )
    }
  return (
    <div className='flex flex-col gap-[10px]'>
        <p className='text-h4 font-medium'>Edit profile</p>
        <form className='w-full h-full flex flex-col gap-[15px]'>
            <div>
                <div className='flex flex-col'>
                    <label htmlFor='foto'>Foto</label>
                    <input type="file" name="" id="" className='bg-gray-50 h-[50px] w-[400px]'/>
                </div>
                <div>
                    <label htmlFor='full_name'>Full Name</label>
                    <Input 
                        placeholder='Masukkan full name'
                        className='bg-white border-2 border-gray-200 rounded-[35px]'
                    />
                </div>
                <div>
                    <label htmlFor='full_name'>Alamat</label>
                    <Input 
                        placeholder='Masukkan alamat'
                        className='bg-white border-2 border-gray-200 rounded-[35px]'
                        value={address?.alamat || ''}
                    />
                </div>
                <div className='flex flex-col'>
                    <label className='lg:text-h4 md:text-h5 text-h6 font-light'>Alamat</label>
                    <div className='flex  w-full'>
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
                            className='border-2 border-gray-200 rounded-[35px] bg-white'
                            onChange={(e) => setKode_Pos(e.target.value)}
                            value={kode_pos}
                        ></Input>
                    </div>
                </div>
            </div>
            <Button
                variant='primary'
                className='text-white py-[15px] w-full rounded-[35px]'
            >Edit</Button>
        </form>
    </div>
  )
}

export default EditProfile