import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getServices, selectAllService, selectAllServiceError, selectAllServiceStatus, selectServiceAround } from '../../features/serviceSlice'
import ServiceCard from '../../components/modules/Cards/ServiceCard'
import { selectAccessToken } from '../../features/authSlice'
import NoServiceNearby from '../../store/NoServiceNearby'

const SearchAllService = () => {
    const dispatch = useDispatch()

    const servicesAround = useSelector(selectServiceAround)
    const allServices = useSelector(selectAllService)
    const status = useSelector(selectAllServiceStatus)
    const error = useSelector(selectAllServiceError)
    const token = useSelector(selectAccessToken)



    useEffect(() => {
        if (status === 'idle' && !allServices) {
            dispatch(getServices())
        }
    }, [status, dispatch])





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

    if (status === 'loading') {
        return (
            <div className='min-h-screen py-[15px] sm:mt-20 flex flex-col gap-[15px] xl:px-[150px] lg:px-[100px] md:px-[55px] sm:px-[35px] px-[10px] mx-auto'>
                <div className='grid gap-y-10 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 md:gap-x-6 gap-x-4'>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <SearchSkeleton key={i} />
                    ))}
                </div>
            </div>
        )
    }

    if (status === 'failed') {
        return (
            <div className='absolute top-0 left-0 right-0 bottom-0 bg-white flex justify-center items-center'>
                <p className='text-h3 font-medium'>
                    Failed to search, something happened
                </p>
            </div>
        )
    }

    return (
        <div className='min-h-screen py-[15px] sm:mt-20 flex flex-col gap-[15px] xl:px-[150px] lg:px-[100px] md:px-[55px] sm:px-[35px] px-[10px] mx-auto'>
            {token ? (
                servicesAround?.length === 0 ? (
                    <NoServiceNearby />
                ) : (
                    <div className='grid gap-y-10 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 md:gap-x-6 gap-x-4'>
                        {servicesAround?.map((service) => (
                            <ServiceCard
                                idService={service?.id}
                                image={service?.foto_product}
                                serviceName={service?.nama_jasa}
                                key={service?.id}
                                basePrice={service?.base_price}
                                topPrice={service?.top_price}
                                desc={service?.deskripsi}
                                guest={token ? false : true}
                            />
                        ))}
                    </div>
                )
            ) : (
                allServices?.length === 0 ? (
                    <NoServiceNearby />
                ) : (
                    <div className='grid gap-y-10 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 md:gap-x-6 gap-x-4'>
                        {allServices?.map((service) => (
                            <ServiceCard
                                idService={service?.id}
                                image={service?.foto_product}
                                serviceName={service?.nama_jasa}
                                key={service?.id}
                                basePrice={service?.base_price}
                                topPrice={service?.top_price}
                                desc={service?.deskripsi}
                                guest={token ? false : true}
                            />
                        ))}
                    </div>
                )
            )}
        </div>
    )
}

export default SearchAllService