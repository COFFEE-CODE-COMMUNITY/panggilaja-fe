import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import { selectSearchText, selectStatus, setSearchText, setStatus } from '../../../features/searchSlice'
import { selectAccessToken, selectCurrentUser } from '../../../features/authSlice'
import { seeAddress, selectSeeAddress } from '../../../features/userSlice'

const AppLayout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search)
  const urlSearchText = searchParams.get('q') || '' 
  
  const searchText = useSelector(selectSearchText)

  const [sidebarProfile, setSidebarProfile] = useState(false)
  const [sidebarMobile, setSidebarMobile] = useState(false)
  
  const [search, setSearch] = useState(urlSearchText || searchText)

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

  const address = useSelector(selectSeeAddress)

  const user = useSelector(selectCurrentUser); 

  useEffect(() => {
      if (user && user.id_buyer) {
          dispatch(seeAddress(user.id_buyer));
      }
  }, [dispatch, user]); 

  let containerClasses = 'relative min-h-screen flex flex-col'
  let mainContentClasses = 'flex-grow h-full';

  if (shouldHideFooter) {
    containerClasses = 'relative h-screen flex flex-col'
    mainContentClasses = 'flex-grow'
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