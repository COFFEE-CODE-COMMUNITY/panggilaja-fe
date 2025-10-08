import React from 'react'
import AuthLayout from '../../components/modules/layouts/AuthLayout'
import ForgetPassForm from './sections/ForgetPassForm'
import { Link } from 'react-router-dom'

const ForgetPassPage = () => {
  return (
    <AuthLayout
        title='Lupa Kata Sandi Anda?'
        subtitle='Jangan khawatir, kami akan membantu Anda.'
        type='Reset Password'
        reset='true'
        navAuth={
            <Link to='/login' className='text-primary text-center'>Kembali ke login</Link>
        }
    >
        <ForgetPassForm/>
    </AuthLayout>
  )
}

export default ForgetPassPage