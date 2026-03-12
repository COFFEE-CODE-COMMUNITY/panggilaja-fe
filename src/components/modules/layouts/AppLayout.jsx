import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from './Header/Header'
import Footer from './Footer'
import useAuthStore from "../../../store/useAuthStore";
import { useGetAddresses } from "../../../hooks/useUsers";

const AppLayout = () => {
  const navigate = useNavigate()
  const location = useLocation();

  const user = useAuthStore(state => state.user)
  const token = useAuthStore(state => state.accessToken)

  let isAddressMissing = false
  let addressStatus = false

  if (token) {
    const { data: addressResponse, isSuccess: addressStatus } = useGetAddresses(user?.id_buyer);
    isAddressMissing = !addressResponse?.alamat
  }

  useEffect(() => {
    if (user?.active_role === 'seller') {
      navigate('/dashboard')
    }
  }, [user?.active_role])

  useEffect(() => {
    if (isAddressMissing && token && addressStatus) {
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
    <div className={`overflow-hidden ${containerClasses}`}>
      <Header />
      <div className={`${mainContentClasses} ${margin} ${location.pathname.includes('nego') || location.pathname.startsWith('/service/') ? '' : 'mb-40'}`}>
        <Outlet />
      </div>
      {!shouldHideFooter && <Footer />}
    </div>
  )
}

export default AppLayout