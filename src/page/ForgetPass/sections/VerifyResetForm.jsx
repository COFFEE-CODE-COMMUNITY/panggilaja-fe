import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InputForm from '../../../components/modules/form/InputForm'
import Button from '../../../components/common/Button'
import { Link, useNavigate } from 'react-router-dom'
import { selectResetEmail, selectResetPasswordVerifyError, selectResetPasswordVerifyMessage, selectResetPasswordVerifyStatus, verifyCodeResetPassword } from '../../../features/authSlice'

const VerifyResetForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [resetCode, setResetCode] = useState('')
  const email = useSelector(selectResetEmail)
  const status = useSelector(selectResetPasswordVerifyStatus)
  const message = useSelector(selectResetPasswordVerifyMessage)
  const error = useSelector(selectResetPasswordVerifyError)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('verivikasi payload ')
    if(email && resetCode){
      dispatch(verifyCodeResetPassword({email, resetCode}))
    }
  }

  useEffect(() => {
    if(status === 'success'){
      navigate('/reset-forget-password')
    }
  },[status])

  console.log(email)
  console.log(status)

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col gap-[10px]'>
        <InputForm onChange={(e) => setResetCode(e.target.value)}/>
        <Button className='w-full md:h-[62px] h-[45px] text-center lg:text-h3 md:text-h4 text-h5 font-semibold bg-primary text-white rounded-[15px] flex justify-center items-center' >Reset</Button>
      </div>
    </form>
  )
}

export default VerifyResetForm