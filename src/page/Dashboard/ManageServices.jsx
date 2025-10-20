import React from 'react'
import InformationService from './sections/InformationService'
import Button from '../../components/common/Button'
import TableServices from './sections/TableServices'
import { Link } from 'react-router-dom'

const ManageServices = () => {
  return (
    <div className='w-full px-[15px] py-[10px] flex flex-col gap-[10px]'>
        <p>Jasa</p>
        <div className='flex flex-col gap-[15px]'>
            <InformationService/>
            <div className='flex flex-col gap-[10px]'>
                <div className='flex justify-end'>
                  <Link to='add-service'>
                    <Button variant='primary' className='px-[10px] py-[5px] text-h6 text-white rounded-[35px]'>Tambah Jasa</Button>
                  </Link>
                </div>
                <TableServices/>
            </div>
        </div>
    </div>
  )
}

export default ManageServices