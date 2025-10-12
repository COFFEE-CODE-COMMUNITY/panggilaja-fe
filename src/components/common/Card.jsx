import React, { Children } from 'react'

const Card = ({children, className, style}) => {
  return (
    <div className={className} style={style}>
        {children}
    </div>
  )
}

export default Card