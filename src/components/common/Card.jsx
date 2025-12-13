import React, { Children } from 'react'
import { Link } from 'react-router-dom'

const Card = ({children, className, style, to = true}) => {
  return (
    <>
      {to ? (
        <Link to={to} className={className} style={style}>
            {children}
        </Link>
      ) : (
        <div className={className} style={style}>
            {children}
        </div>
      )}
    </>
  )
}

export default Card