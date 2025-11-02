import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from './Header/Header'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import { selectSearchText, setSearchText } from '../../../features/searchSlice'
import { selectAuthStatus, selectCurrentUser } from '../../../features/authSlice'
import { seeAddress, selectSeeAddress } from '../../../features/userSlice'

const AppLayout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search)
  const urlSearchText = searchParams.get('q') || '' 
  
  const authStatus = useSelector(selectAuthStatus)

  const searchText = useSelector(selectSearchText)

  const [sidebarProfile, setSidebarProfile] = useState(false)
  const [sidebarMobile, setSidebarMobile] = useState(false)
  
  const [search, setSearch] = useState(urlSearchText || searchText)

  const user = useSelector(selectCurrentUser)
  const address = useSelector(selectSeeAddress)

  useEffect(() => {
    if(!address){
      dispatch(seeAddress(user?.id_buyer))
    }
  },[dispatch])

  useEffect(() => {
    if (!address || !user?.id_buyer) return;
    
    if (address?.data && address.data.alamat === null) {
      if (location.pathname !== '/form-detail-profile') {
        navigate('/form-detail-profile', { replace: true })
      }
    }
  }, [address, user, location.pathname, navigate])

  useEffect(() => {
      setSearch(urlSearchText)
      dispatch(setSearchText(urlSearchText))
  }, [location.search, dispatch]) 

  useEffect(() => {
      if(sidebarProfile){
          setSidebarProfile(false)
      }
  },[location.pathname])

  const handleChange = (e) => {
      setSearch(e.target.value)
  }

  const handleSubmit = (e) => {
      e.preventDefault()
      dispatch(setSearchText(search)) 
      const targetPath = search ? `/search-result?q=${encodeURIComponent(search)}` : '/search-result';
      navigate(targetPath)
  }

  const noFooterPaths = [
    '/chat', '/service'
  ];

  const shouldHideFooter = noFooterPaths.some(path => location.pathname.startsWith(path));

  useEffect(() => {
      if (user && user.id_buyer) {
          dispatch(seeAddress(user.id_buyer));
      }
  }, [dispatch, user]); 

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
      <Header 
        handleChange={handleChange} 
        handleSubmit={handleSubmit} 
        setSidebarProfile={setSidebarProfile} 
        sidebarProfile={sidebarProfile} 
        sidebarMobile={sidebarMobile}
        setSidebarMobile={setSidebarMobile}
        search={search}
      />
      <div className={mainContentClasses}> 
        <Outlet context={search}/>
      </div>
      {!shouldHideFooter && <Footer/>}
    </div>
  )
}

export default AppLayout