import React from 'react'
import AuthLayout from '../../components/modules/layouts/AuthLayout'
import { Link } from 'react-router-dom'
import RequestForm from './sections/RequestForm'

const RequestReset = () => {
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
        <RequestForm/>
    </AuthLayout>
  )
}

export default RequestReset