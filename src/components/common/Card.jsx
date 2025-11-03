import React, { Children } from 'react'
import { Link } from 'react-router-dom'

const Card = ({children, className, style, to}) => {
  return (
    <Link to={to} className={className} style={style}>
        {children}
    </Link>
  )
}

export default Card