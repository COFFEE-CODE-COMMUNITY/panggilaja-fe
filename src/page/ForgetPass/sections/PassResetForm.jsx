import React, { useEffect, useState } from 'react'
import InputForm from '../../../components/modules/form/InputForm'
import Button from '../../../components/common/Button'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword, selectResetCode, selectResetEmail, selectResetPasswordMessage, selectResetPasswordStatus } from '../../../features/authSlice'

const PassResetForm = () => {
  const [newPassword, setNewPassword] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('')

  const resetCode = useSelector(selectResetCode)
  const status = useSelector(selectResetPasswordStatus)
  const email = useSelector(selectResetEmail)
  const message = useSelector(selectResetPasswordMessage)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if(resetCode && newPassword === verifyPassword){
      dispatch(resetPassword({email, resetCode, newPassword}))
    }
  }

  useEffect(() => {
    if(status === 'success'){
      navigate('/')
    }
  },[status])

  const Equals = newPassword === verifyPassword

  console.log(message)
  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col gap-[10px]'>
        <InputForm label='Sandi baru' placeholder='Masukkan sandi baru' type='text' onChange={(e) => setNewPassword(e.target.value)}/>
        <InputForm label='Konfirmasi sandi baru' placeholder='Konfirmasi sandi baru' type='text' onChange={(e) => setVerifyPassword(e.target.value)}/>
        {!Equals ? <p>sandi harus sama</p> : ''}
        <Button className='w-full md:h-[62px] h-[45px] text-center lg:text-h3 md:text-h4 text-h5 font-semibold bg-primary text-white rounded-[15px] flex justify-center items-center' >Reset</Button>
      </div>
    </form>
  )
}

export default PassResetForm