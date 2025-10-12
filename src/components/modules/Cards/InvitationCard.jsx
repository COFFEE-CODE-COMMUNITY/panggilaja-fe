import React from 'react'
import Card from '../../common/Card'

const combineClass = ((baseClass, customClass) => {
    return `${baseClass} ${customClass}`.trim()
})

const InvitationCard = ({children, className}) => {
    const baseClass = 'bg-secondary w-full rounded-[40px] px-[40px] py-[30px] flex flex-col gap-[15px]';
    const finalClass = combineClass(baseClass, className)
  return (
    <Card className={finalClass}>
        {children}
    </Card>
  )
}

export default InvitationCard