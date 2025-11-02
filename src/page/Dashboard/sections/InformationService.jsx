import React from 'react'
import DashboardInformationCard from '../../../components/modules/Cards/DashboardInformationCard'

const InformationService = () => {
  return (
    <div className='w-full grid grid-cols-3 gap-[10px]'>
        <DashboardInformationCard
            title='Total Jasa'
            total='12'
        />
        <DashboardInformationCard
            title='Jasa Aktif'
            total='12'
        />
        <DashboardInformationCard
            title='Jasa Non Aktif'
            total='12'
        />
    </div>
  )
}

export default InformationService