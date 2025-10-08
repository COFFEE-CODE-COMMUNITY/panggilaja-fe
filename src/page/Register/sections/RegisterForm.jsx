import React from 'react'
import InputForm from '../../../components/modules/form/InputForm'

const RegisterForm = () => {
  return (
    <div className='flex flex-col lg:gap-[15px] gap-[10px]'>
        <InputForm label='Username atau Email' variant='cols' placeholder='Masukkan username atau email' className='' type='text'/>
        <InputForm label='Username atau Email' variant='cols' placeholder='Masukkan username atau email' className='' type='text'/>
        <InputForm label='Password' variant='cols' placeholder='Masukkan password' className='' type='password'/>
        <InputForm label='Password' variant='cols' placeholder='Masukkan password' className='' type='password'/>
        <p className='text-h6 lg:text-h5 font-light w-full text-right'>Lupa password?</p>
    </div>
  )
}

export default RegisterForm