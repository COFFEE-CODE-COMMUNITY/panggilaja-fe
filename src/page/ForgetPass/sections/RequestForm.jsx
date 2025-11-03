import React, { useEffect, useState } from 'react'
import InputForm from '../../../components/modules/form/InputForm'
import Button from '../../../components/common/Button'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { requestResetPassword,selectResetPasswordRequestMessage, selectResetPasswordRequestStatus, } from '../../../features/authSlice'

const RequestForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')

  const status = useSelector(selectResetPasswordRequestStatus)
  const message = useSelector(selectResetPasswordRequestMessage)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(requestResetPassword(email))
  }

  useEffect(() => {
    if(status === 'success'){
      navigate('/verify-forget-password')
    }
  },[dispatch, status])

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col gap-[10px]'>
        <InputForm label='Email' placeholder='Masukkan email' type='email' onChange={(e) => setEmail(e.target.value)}/>
        <Button
          type="submit"
          className="group w-full h-12 md:h-14 text-base md:text-lg font-bold bg-primary hover:bg-primary/90 text-white rounded-xl flex justify-center items-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 mt-2"
        >
          <span>Reset Password</span>
        </Button>
      </div>
    </form>
  )
}

export default RequestForm