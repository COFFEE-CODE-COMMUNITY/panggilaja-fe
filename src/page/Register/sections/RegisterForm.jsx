import React from 'react'
import InputForm from '../../../components/modules/form/InputForm'
import NavLink from '../../../components/modules/navigation/NavLink'

const RegisterForm = () => {
  return (
    <div className='flex flex-col lg:gap-[15px] gap-[10px]'>
        <InputForm label='Username' variant='cols' placeholder='Masukkan username' className='' type='text'/>
        <InputForm label='Email' variant='cols' placeholder='Masukkan email' className='' type='email'/>
        <InputForm label='Password' variant='cols' placeholder='Masukkan password' className='' type='password'/>
        <InputForm label='Konfirmasi Password' variant='cols' placeholder='Masukkan password' className='' type='password'/>
    </div>
  )
}

export default RegisterForm