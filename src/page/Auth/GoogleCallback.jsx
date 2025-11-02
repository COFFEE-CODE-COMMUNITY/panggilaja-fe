import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { googleLoginSuccess, selectCurrentUser } from '../../features/authSlice'
import { jwtDecode } from "jwt-decode"
import { selectAddAddressStatus, selectSeeAddress, selectSeeAddressStatus } from '../../features/userSlice'

const GoogleCallback = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector(selectCurrentUser)
  const address = useSelector(selectSeeAddress)
  const addressStatus = useSelector(selectSeeAddressStatus)
  const addAddressStatus = useSelector(selectAddAddressStatus)
  
  useEffect(() => {
    const token = searchParams.get('token')
    const user = searchParams.get('user')
    const error = searchParams.get('error')
    
    console.log(token)

    const handleGoogleCallback = async () => {
      try {
        if (token && user) {
          const userData = JSON.parse(decodeURIComponent(user));
          await dispatch(googleLoginSuccess({
            status: 'success',
            message: 'Login dengan Google berhasil',
            data: { user: userData, token }
          })).unwrap();

          if (address?.data?.provinsi || address?.data?.alamat) {
            navigate('/', { replace: true });
          } else {
            navigate('/form-detail-profile');
          }
        }
        else if (error) {
          navigate('/login?error=Gagal login dengan Google')
        } else {
          navigate('/login')
        }
      } catch (error) {
        console.error('Google callback error:', error)
        navigate('/login?error=Gagal login dengan Google')
      }
    }

    handleGoogleCallback()
  }, [searchParams, navigate, dispatch])

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='text-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4'></div>
        <p className='text-lg'>Memproses login dengan Google...</p>
      </div>
    </div>
  )
}

export default GoogleCallback