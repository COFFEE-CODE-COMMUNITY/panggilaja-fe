import React from 'react'
import Card from '../../common/Card'

const DashboardInformationCard = ({title, total}) => {
  return (
    <Card className='w-full px-[20px] py-[15px] bg-gray-50 rounded-[25px]'>
        <p>{title}</p>
        <span className='text-h3'>{total}</span>
    </Card>
  )
}

export default DashboardInformationCard