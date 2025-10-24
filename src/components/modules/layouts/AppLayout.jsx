import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import { selectSearchText, selectStatus, setSearchText, setStatus } from '../../../features/searchSlice'

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

  return (
    <div className='relative'>
      <Header 
        handleChange={handleChange} 
        handleSubmit={handleSubmit} 
        setSidebarProfile={setSidebarProfile} 
        sidebarProfile={sidebarProfile} 
        sidebarMobile={sidebarMobile}
        setSidebarMobile={setSidebarMobile}
        search={search}
      />
      <Outlet context={search}/>
      <Footer/>
    </div>
  )
}

export default AppLayout