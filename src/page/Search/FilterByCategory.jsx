import React, { useEffect } from 'react'
import { useGetServices, useGetServicesAround } from '../../hooks/useServices'
import useAuthStore from '../../store/useAuthStore'
import { useGetAddresses } from '../../hooks/useUsers'
import ServiceAround from '../LandingPage/sections/ServiceAround'
import ServiceCard from '../../components/modules/Cards/ServiceCard'
import NoServiceNearby from '../../store/NoServiceNearby'
import { useParams } from 'react-router-dom'

const FilterByCategory = () => {
    const { id } = useParams()

    const user = useAuthStore(state => state.user)
    const token = useAuthStore(state => state.accessToken)

    const { data: addressResponse } = useGetAddresses(user?.id_buyer);
    const userKecamatan = addressResponse?.kecamatan;

    const { data: allServicesResponse } = useGetServices();
    const allService = allServicesResponse?.data || allServicesResponse || [];

    const { data: servicesAroundResponse, isFetching } = useGetServicesAround(user?.id_buyer, userKecamatan);
    let servicesByCategory = []

    if (token) {
        servicesByCategory = servicesAroundResponse?.data?.filter((service) => service?.kategori_id === id)
    } else {
        servicesByCategory = allService?.filter((service) => service?.kategori_id === id)
    }
    console.log(servicesAroundResponse)
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

    if (isFetching) {
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