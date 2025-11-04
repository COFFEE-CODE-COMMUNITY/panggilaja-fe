import React from 'react'

const ImageService = ({image}) => {
  return (
    <img 
      src={image}
      className='lg:h-full lg:w-[55%] w-full object-cover sm:rounded-xl md:aspect-12/5 aspect-7/8'
    ></img>
  )
}

export default ImageService