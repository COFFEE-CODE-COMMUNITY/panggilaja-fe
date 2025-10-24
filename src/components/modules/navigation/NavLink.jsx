import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const NavLink = ({link, text, className, onClick}) => {
  return (
    <Link to={link} className={className} onClick={onClick}>{text}</Link>
  )
}

export default NavLink