import React from 'react'
import Card from '../../components/common/Card'
import InformationOrder from './sections/InformationOrder'
import TableOrder from './sections/TableOrder'

const ManageOrder = () => {
  return (
    <div className='w-full px-[15px] py-[10px] flex flex-col gap-[10px]'>
        <div>
            <p>Pesanan</p>
        </div>
        <div className='h-full flex flex-col gap-[15px]'>
            <InformationOrder/>
            <TableOrder/>
        </div>
    </div>
  )
}

export default ManageOrder