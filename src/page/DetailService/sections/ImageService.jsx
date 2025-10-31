import React from 'react'

const ImageService = ({image}) => {
  return (
    <div 
      className='md:h-full h-1/2 lg:w-[55%] w-full'
      style={{
        backgroundImage : `url(${image})`,
        backgroundPosition : 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    ></div>
  )
}

export default ImageService