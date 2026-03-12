import React, { useState } from 'react'
import InputForm from '../../../components/modules/form/InputForm'
import Button from '../../../components/common/Button'
import { useNavigate } from 'react-router-dom'
import { useResetPassword } from '../../../hooks/useAuth'
import useAuthStore from '../../../store/useAuthStore'

const PassResetForm = () => {
  const [newPassword, setNewPassword] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('')

  const resetEmail = useAuthStore((state) => state.resetEmail);
  const resetCode = useAuthStore((state) => state.resetCode);

  const navigate = useNavigate()
  const { mutateAsync: resetPass, status } = useResetPassword();

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (resetCode && newPassword === verifyPassword) {
      try {
        await resetPass({ email: resetEmail, resetCode, newPassword });
        navigate('/');
      } catch (error) {
        console.error("Reset password failed:", error);
      }
    }
  }

  const Equals = newPassword === verifyPassword

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col gap-[10px]'>
        <InputForm label='Sandi baru' placeholder='Masukkan sandi baru' type='password' onChange={(e) => setNewPassword(e.target.value)} />
        <InputForm label='Konfirmasi sandi baru' placeholder='Konfirmasi sandi baru' type='password' onChange={(e) => setVerifyPassword(e.target.value)} />
        {!Equals && verifyPassword ? <p className="text-red-500 text-sm">sandi harus sama</p> : ''}
        <Button
          type="submit"
          disabled={status === 'loading' || !Equals}
          className="group w-full h-12 md:h-14 text-base md:text-lg font-bold bg-primary hover:bg-primary/90 text-white rounded-xl flex justify-center items-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 mt-2 disabled:bg-gray-400"
        >
          <span>{status === 'loading' ? 'Loading...' : 'Masuk Sekarang'}</span>
        </Button>
      </div>
    </form>
  )
}

export default PassResetForm