import React from 'react'
import Button from '../../components/common/Button'
import InputForm from '../../components/modules/form/InputForm'

const FormAfterRegist = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        <div className='w-full h-[45px] flex justify-center items-center'>
            <p className='text-primary text-h3 font-semibold'>PanggilAja</p>
        </div>
        <div className='flex justify-center items-center h-[85vh]'>
            <div className='w-[700px]'>
                <p className='text-h4 font-medium'>Detail Profil</p>
                <form className='flex flex-col gap-[15px] px-[15px]'>
                    <div className='flex items-center'>
                        <label htmlFor='profil' className='w-[250px]'>Unggah Profil</label>
                        <div className='flex w-full gap-[10px] items-center'>
                            <div className='w-[60px] h-[60px] rounded-full bg-amber-100'></div>
                        </div>
                    </div>
                    <InputForm
                        label='Nama Lengkap'
                        variant='rows'
                        placeholder='Masukkan Nama Lengkap'
                        id='namaLengkap'
                    />
                    <div className='flex'>
                        <label className='lg:text-h4 md:text-h5 text-h6 w-[250px]'>Alamat</label>
                        <div className='flex gap-[10px] w-full'>
                            <select className='border-2 border-gray-200 px-[10px] py-[5px] rounded-[35px] bg-white'>
                                <option value="provinsi">Provinsi</option>
                            </select>
                            <select className='border-2 border-gray-200 px-[10px] py-[5px] rounded-[35px] bg-white'>
                                <option value="kota">Kota</option>
                            </select>
                            <select className='border-2 border-gray-200 px-[10px] py-[5px] rounded-[35px] bg-white'>
                                <option value="kecamatan">Kecamatan</option>
                            </select>
                            <select className='border-2 border-gray-200 px-[10px] py-[5px] rounded-[35px] bg-white'>
                                <option value="kelurahan">Kelurahan</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex'>
                        <label htmlFor="detailAddress" className='w-[250px]'>Detail Alamat</label>
                        <textarea name="detailAdress" id="detailAdress" placeholder='Masukkan detail alamat' className='w-full h-[150px] bg-white p-[10px] rounded-[15px] border-2 border-gray-200'></textarea>
                    </div>
                    <div className='w-full text-right'>
                        <Button variant='primary' className='text-white px-[10px] py-[5px] rounded-[35px]'>Selesai</Button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default FormAfterRegist