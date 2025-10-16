import React, { useEffect } from 'react'
import AuthLayout from '../../components/modules/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectResetEmail } from '../../features/authSlice'
import VerifyResetForm from './sections/VerifyResetForm'

const VerifyReset = () => {
  const email = useSelector(selectResetEmail)
  const navigate = useNavigate()
  useEffect(() => {
    if(!email){
      return <p>p</p>
    }
  },[email])
  return (
    <AuthLayout
        title='Reset Password'
        subtitle={`Kami telah mengirim kode ke ${email}`}
        type='Reset Password'
        reset='true'
        navAuth={
            <Link to='/login' className='text-primary text-center'>Kembali ke login</Link>
        }
    >
        <VerifyResetForm/>
    </AuthLayout>
  )
}

export default VerifyReset