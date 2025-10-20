import React from 'react'
import InputForm from '../../../components/modules/form/InputForm'
import Button from '../../../components/common/Button'

const FormAddService = () => {
  return (
    <div className='w-full'>
        <form className='flex flex-col gap-[15px]'>
            <InputForm
                label='Nama Jasa'
                type='text'
                placeholder='Masukkan Nama Jasa'
            />
            <InputForm
                label='Kategori Jasa'
                type='text'
                placeholder='Kategori Jasa'
            />
            <InputForm
                label='Harga'
                type='text'
                placeholder='Harga'
            />
            <InputForm
                label='Deskripsi'
                type='text'
                placeholder='Masukkan deskripsi jasa'
                className='h-[200px] '
            />
            <Button variant='primary' className='w-full text-white py-[15px] rounded-[35px]'>
                Tambahkan
            </Button>
        </form>
    </div>
  )
}

export default FormAddService