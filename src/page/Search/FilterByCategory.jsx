import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getServices, getServicesAround, selectAllService, selectServiceAround, selectServiceAroundStatus } from '../../features/serviceSlice'
import { selectAccessToken, selectCurrentUser } from '../../features/authSlice'
import { seeAddress, selectSeeAddress } from '../../features/userSlice'
import ServiceAround from '../LandingPage/sections/ServiceAround'
import ServiceCard from '../../components/modules/Cards/ServiceCard'

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
        dispatch(seeAddress(user.id_buyer))
        }
    }, [dispatch]);

    useEffect(() => {
        if(address?.data?.kecamatan && user?.id){
            dispatch(getServicesAround({id : user.id, kecamatan : address?.data?.kecamatan}))
        }
    },[address?.data?.kecamatan])

    servicesAround.map((service) => {
        console.log(service)
    })

    return (
        <div className='min-h-screen xl:px-[150px] lg:px-[100px] md:px-[55px] sm:px-[35px] px-[10px] py-[15px] flex flex-col gap-[15px]'>
            {/* <p className='font-medium'>Hasil Filter Untuk: {searchText}</p> */}
            
            {servicesAround.length === 0 && lowerCaseSearchText !== '' && (
                <p className='text-h5 text-gray-600'>Tidak ditemukan hasil untuk "{searchText}".</p>
            )}

            <div className='grid md:grid-cols-4 grid-cols-2 gap-x-1 gap-y-4 md:gap-x-2 md:gap-y-5 lg:gap-x-3 lg:gap-y-6'>
                {servicesAround.map((service) => (
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
        </div>
  )
}

export default FilterByCategory