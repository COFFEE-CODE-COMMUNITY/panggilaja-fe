import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from './Header/Header'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import { selectAccessToken, selectAuthStatus, selectCurrentUser } from '../../../features/authSlice'
import { seeAddress, selectSeeAddress, selectSeeAddressStatus } from '../../../features/userSlice'

const AppLayout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation();
  
  const user = useSelector(selectCurrentUser)
  const token = useSelector(selectAccessToken)
  const address = useSelector(selectSeeAddress)

  useEffect(() => {
    if(user?.id_buyer && token){
      dispatch(seeAddress(user?.id_buyer))
    }
  },[dispatch])
  
  const addressStatus = useSelector(selectSeeAddressStatus); // Pastikan selector ini ada

  useEffect(() => {    
    // 1. Cek HANYA JIKA status pengambilan data sudah SUKSES
    if (addressStatus === 'success') {
        
        const addressData = address?.data;
        
        // 2. Cek apakah properti alamat benar-benar kosong (null, undefined, atau string kosong)
        // Note: Gunakan 'addressData' untuk memeriksa keberadaan objek alamat itu sendiri (jika database mengembalikan null)
        const isAddressMissing = !addressData || !addressData.alamat || addressData.alamat === null;

        if (isAddressMissing) {
            if (location.pathname !== '/form-detail-profile') {
                navigate('/form-detail-profile', { replace: true });
            }
        }
    }
    
    // 4. Dependency Array: Gunakan status untuk mengontrol kapan cek ini dijalankan.
    // Tidak perlu 'address' atau 'user' secara langsung, cukup statusnya yang berubah.
  }, [addressStatus, location.pathname, navigate]);

  const noFooterPaths = [
    '/chat', '/service'
  ];

  const shouldHideFooter = noFooterPaths.some(path => location.pathname.startsWith(path));

  let containerClasses = 'h-full'
  let mainContentClasses = '';

  if (shouldHideFooter) {
    containerClasses = 'relative h-screen flex flex-col'
    mainContentClasses = 'flex-grow'
  }

  if (location.pathname.startsWith('/profile-service')){
    containerClasses = 'h-screen relative flex flex-col'
  }

  return (
    <div className={containerClasses}>
      <Header/>
      <div className={mainContentClasses}> 
        <Outlet/>
      </div>
      {!shouldHideFooter && <Footer/>}
    </div>
  )
}

export default AppLayout