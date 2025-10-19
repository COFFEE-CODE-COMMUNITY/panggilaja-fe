import React from 'react'
import ProfileLayout from '../../components/modules/layouts/ProfileLayout'
import { useOutletContext } from 'react-router-dom'

const ProfileIndex = () => {
  const {profileData, search} = useOutletContext()
  
  console.log(useOutletContext())
  return (
    <div className='min-h-screen'></div>
  )
}

export default ProfileIndex