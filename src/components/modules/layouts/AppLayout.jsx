import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import { selectSearchText, selectStatus, setSearchText, setStatus } from '../../../features/searchSlice'

const AppLayout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [sidebarProfile, setSidebarProfile] = useState(false)
  const [sidebarMobile, setSidebarMobile] = useState(false)

  const searchText = useSelector(selectSearchText)

  const [search, setSearch] = useState(searchText)

  const location = useLocation()

  useEffect(() => {
    if(sidebarProfile){
      setSidebarProfile(false)
    }
  },[location.pathname])

  useEffect(() => {
    setSearch(searchText)
  },[searchText])

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(setSearchText(search))

    navigate('/search-result')
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
      />
      <Outlet context={search}/>
      <Footer/>
    </div>
  )
}

export default AppLayout