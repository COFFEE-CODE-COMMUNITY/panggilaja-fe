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
    const { id } = useParams()

    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser)
    const token = useSelector(selectAccessToken)
    const address = useSelector(selectSeeAddress)

    const servicesAround = useSelector(selectServiceAround)
    const servicesAroundStatus = useSelector(selectServiceAroundStatus)
    const allService = useSelector(selectAllService)

    console.log(allService)

    useEffect(() => {
        if (user?.id_buyer && token) {
            dispatch(seeAddress(user?.id_buyer))
        }
    }, [user?.id_buyer, token]);

    useEffect(() => {
        if (address?.data?.kecamatan && user?.id) {
            dispatch(getServicesAround({ id: user.id, kecamatan: address?.data?.kecamatan }))
        }
    }, [address?.data?.kecamatan])

    let servicesByCategory = []

    if (token) {
        servicesByCategory = servicesAround?.filter((service) => service?.kategori_id === id)
    } else {
        servicesByCategory = allService?.filter((service) => service?.kategori_id === id)
    }
    console.log(servicesAround)





    const SearchSkeleton = () => (
        <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm animate-pulse">
            <div className="w-full h-48 bg-gray-200" />
            <div className="p-4 space-y-3">
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="flex justify-between items-center pt-2">
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-8 bg-gray-200 rounded w-1/3" />
                </div>
            </div>
        </div>
    );

    if (servicesAroundStatus === 'loading') {
        return (
            <div className='min-h-screen xl:px-[150px] sm:mt-20 lg:px-[100px] md:px-[55px] sm:px-[35px] px-[10px] py-[15px] flex flex-col gap-[15px]'>
                <div className='grid md:grid-cols-4 grid-cols-2 gap-x-1 gap-y-4 md:gap-x-2 md:gap-y-5 lg:gap-x-3 lg:gap-y-6'>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <SearchSkeleton key={i} />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div key={id} className='min-h-screen xl:px-[150px] sm:mt-20 lg:px-[100px] md:px-[55px] sm:px-[35px] px-[10px] py-[15px] flex flex-col gap-[15px] animate-fade-in'>
            {servicesByCategory?.length === 0 ? (
                <NoServiceNearby />
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