import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import { selectSearchText, setSearchText } from '../../../features/searchSlice'

const AppLayout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchText = useSelector(selectSearchText)

  const [search, setSearch] = useState(searchText)

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
      <Header handleChange={handleChange} handleSubmit={handleSubmit}/>
      <Outlet context={search}/>
      <Footer/>
    </div>
  )
}

export default AppLayout