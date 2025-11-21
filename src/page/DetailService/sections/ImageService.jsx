import React from 'react'

const ImageService = ({ image }) => {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
      <img
        src={image}
        alt="Service"
        className='w-full h-full object-cover aspect-video lg:max-h-[500px]'
      />
    </div>
  )
}

export default ImageService