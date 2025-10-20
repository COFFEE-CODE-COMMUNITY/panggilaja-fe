import React from 'react'
import FormAddService from './sections/FormAddService'

const AddService = () => {
  return (
    <div className='w-full flex-1 min-h-[85vh]'>
        <p>Tambah Jasa</p>
        <div className='h-full flex gap-[15px] py-[30px]'>
            <div className='w-1/2 flex items-center justify-center p-[30px]'>
                <div className='aspect-square w-full bg-gray-50'></div>
            </div>
            <div className='w-1/2 flex items-center justify-center'>
                <FormAddService/>
            </div>
        </div>
    </div>
  )
}

export default AddService