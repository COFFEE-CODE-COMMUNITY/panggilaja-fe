import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from './Header/Header'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import { selectAccessToken, selectCurrentUser } from '../../../features/authSlice'
import { seeAddress, selectSeeAddress, selectSeeAddressStatus } from '../../../features/userSlice'

const AppLayout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation();
  
  const user = useSelector(selectCurrentUser)
  const token = useSelector(selectAccessToken)
  const address = useSelector(selectSeeAddress)
  
  const addressStatus = useSelector(selectSeeAddressStatus); 

  const addressData = address?.data;
  const isAddressMissing = !addressData || !addressData.alamat || addressData.alamat === null;

  useEffect(() => {
    if(user?.id_buyer && token && (address === null || address?.data?.alamat === null)){
      dispatch(seeAddress(user.id_buyer))
    }
  }, [dispatch, user?.id_buyer, token]);

  useEffect(() => {
    if (isAddressMissing && token && addressStatus === 'success') {
      navigate('/form-detail-profile', { replace: true });
    }
  }, [isAddressMissing, token, addressStatus, navigate]);

  const noFooterPaths = [
    '/chat', '/service'
  ];

  const shouldHideFooter = noFooterPaths.some(path => location.pathname.startsWith(path));

  let containerClasses = 'h-full'
  let mainContentClasses = '';

  if (shouldHideFooter) {
    containerClasses = 'relative flex flex-col'
    mainContentClasses = 'flex-grow'
  }

  if (location.pathname.startsWith('/profile-service')){
    containerClasses = 'h-screen relative flex flex-col'
  }

  return (
    <div className={`${containerClasses} overflow-hidden`}>
      <Header/>
      <div className={`${mainContentClasses} lg:mt-20 md:mt-19 mt-18`}> 
        <Outlet/>
      </div>
      {!shouldHideFooter && <Footer/>}
    </div>
  )
}

export default AppLayout