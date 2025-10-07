import React from 'react'
import AuthLayout from '../../components/modules/layouts/AuthLayout'
import NavLink from '../../components/modules/navigation/NavLink'
import FormRegister from '../../components/modules/Form/FormRegister'

const RegisterPage = () => {
  return (
    <AuthLayout
      title='Buat akun baru'
      subtitle='Daftar & Dapatkan Jasa Terbaik di Dekat Anda'
      type='Daftar'
      navAuth={
        <p className='text-h5 text-primary w-full text-center'>
          Sudah punya akun? <NavLink className="font-semibold text-primary" link='/login' text='masuk disini'/>'
        </p>
      }
    >
      <FormRegister/>
    </AuthLayout>
  )
}

export default RegisterPage