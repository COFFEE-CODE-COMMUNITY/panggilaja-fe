import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ImageService from './sections/ImageService'
import { getServicesById, selectSelectedService } from '../../features/serviceSlice'
import { useEffect } from 'react'
import InformationService from './sections/InformationService'

const DetailService = () => {
  const {id} = useParams()
  const dispatch = useDispatch()

  const service = useSelector(selectSelectedService)

  useEffect(() => {
    if(id){
      dispatch(getServicesById(id))
    }
  },[dispatch])

  
  console.log(service)
  return (
    <div className='md:flex min-h-screen gap-[35px]'>
        <ImageService/>
        
    </div>
  )
}

export default DetailService