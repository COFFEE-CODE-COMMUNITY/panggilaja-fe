import React from 'react'
import FormAddService from './sections/FormAddService'

const AddService = () => {
  return (
    <div className='w-full flex-1 min-h-[85vh]'>
        <p>Tambah Jasa</p>
        <div className='h-full flex gap-[15px] py-[30px] w-full'>
          <FormAddService/>
        </div>
    </div>
  )
}

export default AddService