import React, { useState } from 'react'
import InputForm from '../../../components/modules/form/InputForm'
import Button from '../../../components/common/Button'
import { useNavigate } from 'react-router-dom'
import { useVerifyCodeResetPassword } from '../../../hooks/useAuth'
import useAuthStore from '../../../store/useAuthStore'

const VerifyResetForm = () => {
  const navigate = useNavigate()
  const [resetCode, setResetCode] = useState('')

  const resetEmail = useAuthStore((state) => state.resetEmail);
  const setZustandResetCode = useAuthStore((state) => state.setResetCode);

  const { mutateAsync: verifyCode, status } = useVerifyCodeResetPassword();

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (resetEmail && resetCode) {
      try {
        await verifyCode({ email: resetEmail, resetCode });
        setZustandResetCode(resetCode);
        navigate('/reset-forget-password');
      } catch (error) {
        console.error("Verification failed:", error);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col gap-[10px]'>
        <InputForm placeholder="Masukkan kode reset" onChange={(e) => setResetCode(e.target.value)} />
        <Button
          disabled={status === 'loading'}
          className='w-full md:h-[62px] h-[45px] text-center lg:text-h3 md:text-h4 text-h5 font-semibold bg-primary text-white rounded-[35px] flex justify-center items-center disabled:bg-gray-400'
        >
          {status === 'loading' ? 'Verifying...' : 'Reset'}
        </Button>
      </div>
    </form>
  )
}

export default VerifyResetForm