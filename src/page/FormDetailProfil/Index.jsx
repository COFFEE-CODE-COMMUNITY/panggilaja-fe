import React from 'react'
import Button from '../../components/common/Button'
import InputForm from '../../components/modules/form/InputForm'
import AfterRegistForm from './sections/AfterRegistForm'

const FormAfterRegist = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        <div className='w-full h-[45px] flex justify-center items-center'>
            <p className='text-primary text-h3 font-semibold'>PanggilAja</p>
        </div>
        <div className='flex justify-center items-center h-[85vh]'>
            <div className='w-[700px] flex flex-col gap-[15px]'>
                <AfterRegistForm/>
            </div>
        </div>
    </div>
  )
}

export default FormAfterRegist