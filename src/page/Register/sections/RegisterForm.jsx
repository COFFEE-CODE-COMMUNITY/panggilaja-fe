import React from 'react'
import InputForm from '../../../components/modules/form/InputForm'
import NavLink from '../../../components/modules/navigation/NavLink'
import Button from '../../../components/common/Button'

const RegisterForm = ({handleSubmit, handleChangeUsername, handleChangeEmail, handleChangePassword, handleChangeConfirmPassword}) => {
  return (
    <div className='flex flex-col lg:gap-[15px] gap-[10px]'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-[5px]'>
        <InputForm label='Username' variant='cols' placeholder='Masukkan username' className='' type='text'  onChange={handleChangeUsername}/>
        <InputForm label='Email' variant='cols' placeholder='Masukkan email' className='' type='email' onChange={handleChangeEmail}/>
        <InputForm label='Password' variant='cols' placeholder='Masukkan password' className='' type='password' onChange={handleChangePassword}/>
        <InputForm label='Konfirmasi Password' variant='cols' placeholder='Masukkan password' className='' type='password' onChange={handleChangeConfirmPassword}/>
        <Button className='w-full md:h-[62px] h-[45px] text-center lg:text-h3 md:text-h4 text-h5 font-semibold bg-primary text-white rounded-[15px] flex justify-center items-center' >Register</Button>
      </form>
    </div>
  )
}

export default RegisterForm