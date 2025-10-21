import React, { useEffect } from 'react'
import AuthLayout from '../../components/modules/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectResetEmail, selectResetPasswordVerifyStatus } from '../../features/authSlice'
import VerifyResetForm from './sections/VerifyResetForm'

const VerifyReset = () => {
  const email = useSelector(selectResetEmail)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const statusVerify = useSelector(selectResetPasswordVerifyStatus)

  useEffect(() => {
      if (statusVerify === 'error') {
        navigate('/request-forget-password'); 
      }
  }, [statusVerify, navigate]);

  useEffect(() => {
      if (!email) {
        navigate('/request-forget-password');
      }
  }, [email, navigate]);

  console.log(statusVerify)
  return (
    <AuthLayout
        title='Reset Password'
        subtitle={`Kami telah mengirim kode ke ${email}`}
        type='Reset Password'
        reset='true'
    >
        <VerifyResetForm/>
    </AuthLayout>
  )
}

export default VerifyReset