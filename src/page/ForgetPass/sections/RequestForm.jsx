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

  console.log(message)
  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col gap-[10px]'>
        <InputForm label='Email' placeholder='Masukkan email' type='email' onChange={(e) => setEmail(e.target.value)}/>
        <Button className='w-full md:h-[62px] h-[45px] text-center lg:text-h3 md:text-h4 text-h5 font-semibold bg-primary text-white rounded-[15px] flex justify-center items-center' >Reset</Button>
      </div>
    </form>
  )
}

export default RequestForm