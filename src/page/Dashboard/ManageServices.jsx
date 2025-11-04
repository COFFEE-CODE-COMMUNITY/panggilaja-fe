import React from 'react'
import InformationService from './sections/InformationService'
import Button from '../../components/common/Button'
import TableServices from './sections/TableServices'
import { Link } from 'react-router-dom'
import { selectServiceSellerStatus } from '../../features/sellerSlice'
import { useSelector } from 'react-redux'
import StatCard from './sections/StatCardOrder'
import TableOrder from './sections/TableOrder'

const ManageServices = () => {
  const status = useSelector(selectServiceSellerStatus)

  return (
    <div className='w-full px-[15px] py-[10px] flex flex-col gap-[10px]'>
        <p>Jasa</p>
        <div className='h-full flex flex-col max-w-7xl gap-10'>
            <StatCard/>
            <TableServices/>
        </div>
    </div>
  )
}

export default ManageServices