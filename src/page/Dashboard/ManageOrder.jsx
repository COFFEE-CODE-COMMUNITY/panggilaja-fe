import React from 'react'
import Card from '../../components/common/Card'
import InformationOrder from './sections/InformationOrder'
import TableOrder from './sections/TableOrder'
import StatCardService from './sections/StatCardService'
import StatCardOrder from './sections/StatCardOrder'

const ManageOrder = () => {
  return (
    <div className='w-full px-[15px] flex flex-col gap-[10px]'>
        <div>
            <p>Pesanan</p>
        </div>
        <div className='h-full flex flex-col max-w-7xl gap-10'>
            <StatCardOrder/>
            <TableOrder/>
        </div>
    </div>
  )
}

export default ManageOrder