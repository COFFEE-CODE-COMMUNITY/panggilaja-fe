import React, { useState } from 'react'
import ProfileLayout from '../../components/modules/layouts/ProfileLayout'
import { useOutletContext } from 'react-router-dom'
import { selectSelectedSeller } from '../../features/sellerSlice'
import { useSelector } from 'react-redux'

const ProfileIndex = () => {
  const seller = useSelector(selectSelectedSeller)

  return (
    <div className='min-h-screen'>
      {seller.deskripsi_toko}
    </div>
  )
}

export default ProfileIndex