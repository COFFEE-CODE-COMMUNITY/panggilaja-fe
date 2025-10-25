import React from 'react'
import Card from '../../common/Card'

const combineClass = ((baseClass, customClass) => {
    return `${baseClass} ${customClass}`.trim()
})

const InvitationCard = ({children, className}) => {
    const baseClass = 'bg-secondary w-full md:rounded-[30px] rounded-[15px] lg:px-[40px] lg:py-[30px] md:px-[30px] md:py-[20px] px-[20px] py-[10px] flex flex-col md:gap-[15px] gap-[5px]';
    const finalClass = combineClass(baseClass, className)
  return (
    <Card className={finalClass}>
        {children}
    </Card>
  )
}

export default InvitationCard