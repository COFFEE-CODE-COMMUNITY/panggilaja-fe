import React from 'react'
import Card from '../../../components/common/Card'
import DashboardInformationCard from '../../../components/modules/Cards/DashboardInformationCard'

const InformationOrder = () => {
  return (
    <div className='w-full grid grid-cols-4 gap-[10px]'>
        <DashboardInformationCard
            title='Total Pesanan'
            total='12'
        />
        <DashboardInformationCard
            title='Pesanan Masuk'
            total='12'
        />
        <DashboardInformationCard
            title='Pesanan Diproses'
            total='12'
        />
        <DashboardInformationCard
            title='Pesanan Selesai'
            total='12'
        />
    </div>
  )
}

export default InformationOrder