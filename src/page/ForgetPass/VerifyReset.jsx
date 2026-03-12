import React, { useEffect } from 'react'
import AuthLayout from '../../components/modules/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore'
import VerifyResetForm from './sections/VerifyResetForm'

const VerifyReset = () => {
  const email = useAuthStore((state) => state.resetEmail)
  const navigate = useNavigate()


  useEffect(() => {
    if (!email) {
      navigate('/request-forget-password');
    }
  }, [email, navigate]);

  return (
    <AuthLayout
      title='Reset Password'
      subtitle={`Kami telah mengirim kode ke ${email}`}
      type='Reset Password'
      reset='true'
    >
      <VerifyResetForm />
    </AuthLayout>
  )
}

export default VerifyReset