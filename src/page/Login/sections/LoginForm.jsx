import React, { useState } from 'react'
import InputForm from '../../../components/modules/form/InputForm'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Button from '../../../components/common/Button'


const LoginForm = ({handleSubmit, handleChangeEmail, handleChangePassword, message}) => {
  return (
    <div className='flex flex-col lg:gap-[15px] md:gap-[10px] gap-[5px]'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-[5px]'>
        <InputForm label='Email' variant='cols' placeholder='Masukkan email' className='' type='text' onChange={handleChangeEmail}/>
        <InputForm label='Password' variant='cols' placeholder='Masukkan password' className='' type='password' onChange={handleChangePassword}/>
        <Link to='/request-forget-password'>
          <p className='text-h6 lg:text-h5 font-light w-full text-right'>Lupa password?</p>
        </Link>
        <p>{message}</p>
        <Button className='w-full md:h-[62px] h-[45px] text-center lg:text-h3 md:text-h4 text-h5 font-semibold bg-primary text-white rounded-[35px] flex justify-center items-center' >Login</Button>
      </form>
    </div>
  )
}

export default LoginForm