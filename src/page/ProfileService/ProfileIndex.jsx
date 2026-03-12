import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetSellerById } from '../../hooks/useSellers'

const ProfileIndex = () => {
  const { id } = useParams();
  const { data: seller } = useGetSellerById(id);

  return (
    <div className='min-h-screen'>
      {seller?.deskripsi_toko}
    </div>
  )
}

export default ProfileIndex