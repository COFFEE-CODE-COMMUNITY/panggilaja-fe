import React from 'react'
import InputForm from '../../../components/modules/form/InputForm'
import { Link, NavLink } from 'react-router-dom'

const LoginForm = () => {
  return (
    <div className='flex flex-col lg:gap-[15px] md:gap-[10px] gap-[5px]'>
        <InputForm label='Username atau Email' variant='cols' placeholder='Masukkan username atau email' className='' type='text'/>
        <InputForm label='Password' variant='cols' placeholder='Masukkan password' className='' type='password'/>
        <Link to='/forget-password'>
          <p className='text-h6 lg:text-h5 font-light w-full text-right'>Lupa password?</p>
        </Link>
    </div>
  )
}

export default LoginForm