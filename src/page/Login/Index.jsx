import React from 'react'
import AuthLayout from '../../components/modules/layouts/AuthLayout'
import NavLink from '../../components/modules/navigation/NavLink'
import LoginForm from './sections/LoginForm'

const LoginPage = () => {
  return (
    <AuthLayout 
      title='Masuk ke akun anda'
      subtitle='Masuk & Dapatkan Jasa Terbaik di Dekat Anda'
      type='Masuk'
      navAuth={
        <p className='text-h6 lg:text-h5 text-primary w-full text-center'>
          Tidak punya akun? <NavLink className="font-semibold text-primary" link='/register' text='buat disini'/>'
        </p>
      }
    >
      <LoginForm/>
    </AuthLayout>
  )
}

export default LoginPage