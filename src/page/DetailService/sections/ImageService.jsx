import React from 'react'

const ImageService = ({image}) => {
  return (
    <div 
      className='md:min-h-screen h-[50vh] lg:w-1/2 w-full rounded-tr-[15px] rounded-br-[15px]'
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