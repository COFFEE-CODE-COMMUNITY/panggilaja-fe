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
    if (user?.active_role === 'seller') {
      navigate('/dashboard')
    }
  }, [user?.active_role])

  useEffect(() => {
    if (user?.id_buyer && token && (address === null || address?.data?.alamat === null)) {
      dispatch(seeAddress(user.id_buyer))
    }
  }, [dispatch, user?.id_buyer, token]);

  useEffect(() => {
    if (isAddressMissing && token && addressStatus === 'success') {
      navigate('/form-detail-profile', { replace: true });
    }
  }, [isAddressMissing, token, addressStatus, navigate]);

  const noFooterPaths = [
    '/chat'
  ];

  const shouldHideFooter = noFooterPaths.some(path => location.pathname.startsWith(path));

  let containerClasses = 'h-full'
  let mainContentClasses = '';
  let margin = ''

  if (shouldHideFooter) {
    containerClasses = 'relative flex flex-col'
    mainContentClasses = 'flex-grow'
  }

  if (location.pathname.startsWith('/profile-service')) {
    containerClasses = 'h-screen relative flex flex-col'
  }

  if (location.pathname.includes('nego') || location.pathname.includes('profile-service') || location.pathname.includes('service')) {
    margin = ''
  } else {
    margin = 'xl:mt-30 lg:mt-25 md:mt-23 mt-16'
  }

  return (
    <div className={`${containerClasses} overflow-hidden`}>
      <Header />
      <div className={`${mainContentClasses} ${margin} ${location.pathname.includes('nego') || location.pathname.startsWith('/service/') ? '' : 'mb-40'}`}>
        <Outlet />
      </div>
      {!shouldHideFooter && <Footer />}
    </div>
  )
}

export default AppLayout