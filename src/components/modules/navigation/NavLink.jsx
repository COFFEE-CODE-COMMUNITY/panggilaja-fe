import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const NavLink = ({link, text, className}) => {
  return (
    <Link to={link} className={className}>{text}</Link>
  )
}

export default NavLink