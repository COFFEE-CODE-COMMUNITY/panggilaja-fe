import React, { useState } from 'react'
import InputForm from '../../../components/modules/form/InputForm'
import Button from '../../../components/common/Button'
import { useNavigate } from 'react-router-dom'
import { useRequestResetPassword } from '../../../hooks/useAuth'
import useAuthStore from '../../../store/useAuthStore'

const RequestForm = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const setResetEmail = useAuthStore((state) => state.setResetEmail);

  const { mutateAsync: requestReset, status } = useRequestResetPassword();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await requestReset(email);
      setResetEmail(email);
      navigate('/verify-forget-password');
    } catch (error) {
      console.error("Request reset failed:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col gap-[10px]'>
        <InputForm label='Email' placeholder='Masukkan email' type='email' onChange={(e) => setEmail(e.target.value)} />
        <Button
          type="submit"
          disabled={status === 'loading'}
          className="group w-full h-12 md:h-14 text-base md:text-lg font-bold bg-primary hover:bg-primary/90 text-white rounded-xl flex justify-center items-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 mt-2 disabled:bg-gray-400"
        >
          <span>{status === 'loading' ? 'Loading...' : 'Reset Password'}</span>
        </Button>
      </div>
    </form>
  )
}

export default RequestForm