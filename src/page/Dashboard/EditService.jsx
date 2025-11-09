import React, { useEffect } from 'react'
import FormEditService from './sections/FormEditService'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getServicesById, selectSelectedService, selectSelectedServiceStatus } from '../../features/serviceSlice'

const EditService = () => {
    const {id} = useParams()
    const dispatch = useDispatch()

    const service = useSelector(selectSelectedService)
    const status = useSelector(selectSelectedServiceStatus)

    useEffect(() => {
        dispatch(getServicesById(id))
    },[id, dispatch])

    console.log(service)
  return (
    <div className='w-full flex-1 min-h-[85vh]'>
        <div className='h-full flex gap-[15px] py-[30px] sm:mb-0 mb-10'>
            {service && status === 'success' ? (
                <FormEditService
                  basePrice={service.base_price}
                  category={service.kategori_id}
                  description={service.deskripsi}
                  serviceName={service.nama_jasa}
                  topPrice={service.top_price}
                  id={service.id}
                  image={service.foto_product}
                />
            ) : (
                ''
            )}
        </div>
    </div>
  )
}

export default EditService