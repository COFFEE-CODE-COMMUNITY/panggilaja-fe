import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteSellerById, resetSellerStatusDelete, selectDeleteSellerMessage, selectDeleteSellerStatus } from '../../features/sellerSlice'
import { selectAccessToken, selectCurrentUser } from '../../features/authSlice'
import { useNavigate } from 'react-router-dom'

const ManageProfile = () => {
  const dispatch = useDispatch()
  const statusDelete = useSelector(selectDeleteSellerStatus)
  const messageDelete = useSelector(selectDeleteSellerMessage)
  const user = useSelector(selectCurrentUser)
  const navigate = useNavigate()

  const token = useSelector(selectAccessToken)

  useEffect(() => {
    if(statusDelete === 'success'){
      dispatch(resetSellerStatusDelete())
      navigate('/')
    }
  },[statusDelete])

  console.log(statusDelete)
  return (
    <div className='flex flex-col'>
      <p>
        ManageProfile
      </p>
      <button 
        className='px-[15px] py-[10px] rounded-[15px] bg-red-700 text-white cursor-pointer'
        onClick={() => dispatch(deleteSellerById(user.id_seller))}  
      >Delete</button>
    </div>
  )
}

export default ManageProfile