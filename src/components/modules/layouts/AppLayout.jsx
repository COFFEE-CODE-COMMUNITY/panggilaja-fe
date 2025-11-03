import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from './Header/Header'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import { selectAccessToken, selectAuthStatus, selectCurrentUser } from '../../../features/authSlice'
import { seeAddress, selectSeeAddress } from '../../../features/userSlice'

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

  console.log(address)

  // useEffect(() => {
  //   if (!address || !user?.id_buyer) return;
    
  //   if (address?.data && address.data.alamat === null) {
  //     if (location.pathname !== '/form-detail-profile') {
  //       navigate('/form-detail-profile', { replace: true })
  //     }
  //   }
  // }, [address, user, location.pathname, navigate])

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