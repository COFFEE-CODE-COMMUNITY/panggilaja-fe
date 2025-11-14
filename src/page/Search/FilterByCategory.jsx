import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getServices, getServicesAround, selectAllService, selectServiceAround, selectServiceAroundStatus } from '../../features/serviceSlice'
import { selectAccessToken, selectCurrentUser } from '../../features/authSlice'
import { seeAddress, selectSeeAddress } from '../../features/userSlice'
import ServiceAround from '../LandingPage/sections/ServiceAround'
import ServiceCard from '../../components/modules/Cards/ServiceCard'
import NoServiceNearby from '../../store/NoServiceNearby'

const FilterByCategory = () => {
    const {id} = useParams()

    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser)
    const token = useSelector(selectAccessToken)
    const address = useSelector(selectSeeAddress)

    const servicesAround = useSelector(selectServiceAround)
    const servicesAroundStatus = useSelector(selectServiceAroundStatus)

    useEffect(() => {
        if(user?.id_buyer && token){
            dispatch(seeAddress(user?.id_buyer))
        }
    }, [user?.id_buyer, token]);

    useEffect(() => {
        if(address?.data?.kecamatan && user?.id){
            dispatch(getServicesAround({id : user.id, kecamatan : address?.data?.kecamatan}))
        }
    },[address?.data?.kecamatan])

    const servicesByCategory = servicesAround?.filter((service) => service?.kategori_id === id )

    return (
        <div className='min-h-screen xl:px-[150px] sm:mt-20 lg:px-[100px] md:px-[55px] sm:px-[35px] px-[10px] py-[15px] flex flex-col gap-[15px]'>
            {servicesByCategory.length === 0 ? (
                <NoServiceNearby/>
            ) : (
                <div className='grid md:grid-cols-4 grid-cols-2 gap-x-1 gap-y-4 md:gap-x-2 md:gap-y-5 lg:gap-x-3 lg:gap-y-6'>
                    {servicesByCategory?.map((service) => (
                        <ServiceCard
                            idService={service.id}
                            image={service.foto_product}
                            serviceName={service.nama_jasa}
                            key={service.id}
                            basePrice={service.base_price}
                            topPrice={service.top_price}
                        />
                    ))}
                </div>
            )}
        </div>
  )
}

export default FilterByCategory