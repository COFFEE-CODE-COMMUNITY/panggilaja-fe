import React from 'react'
import Input from '../../common/Input'

const SearchBar = ({className}) => {
  return (
    <div>
        <Input placeholder='Cari jasa terdekat' className={className}/>
    </div>
  )
}

export default SearchBar