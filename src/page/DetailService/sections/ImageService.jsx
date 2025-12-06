import React from 'react'

const ImageService = ({ image }) => {
  return (
    <div className="w-full lg:w-[40rem] xl:w-[42rem] overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
      <img
        src={image}
        alt="Service"
        className='w-full h-full object-cover aspect-square'
      />
    </div>
  )
}

export default ImageService