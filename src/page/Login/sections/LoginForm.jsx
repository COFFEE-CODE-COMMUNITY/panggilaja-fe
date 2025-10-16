import React, { useState } from 'react'
import InputForm from '../../../components/modules/form/InputForm'
import { Link, NavLink } from 'react-router-dom'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  console.log(password)

  return (
    <div className='flex flex-col lg:gap-[15px] md:gap-[10px] gap-[5px]'>
        <InputForm label='Email' variant='cols' placeholder='Masukkan email' className='' type='text' onChange={(e) => setEmail(e.target.value)}/>
        <InputForm label='Password' variant='cols' placeholder='Masukkan password' className='' type='password' onChange={(e) => setPassword(e.target.value)}/>
        <Link to='/forget-password'>
          <p className='text-h6 lg:text-h5 font-light w-full text-right'>Lupa password?</p>
        </Link>
    </div>
  )
}

export default LoginForm