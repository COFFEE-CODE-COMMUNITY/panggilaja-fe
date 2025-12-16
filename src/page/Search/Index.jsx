import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getServices, selectAllService, selectAllServiceError, selectAllServiceStatus } from '../../features/serviceSlice'
import { selectSearchText } from '../../features/searchSlice'
import ServiceCard from '../../components/modules/Cards/ServiceCard'
import { useLocation } from 'react-router-dom'

const SearchPage = () => {
    const dispatch = useDispatch()

    const allServices = useSelector(selectAllService)
    const status = useSelector(selectAllServiceStatus)
    const error = useSelector(selectAllServiceError)

    const searchText = useSelector(selectSearchText)
    const lowerCaseSearchText = searchText.toLowerCase().trim()



    useEffect(() => {
        if (status === 'idle' && !allServices) {
            dispatch(getServices())
        }
    }, [status, dispatch])



    const serviceSearch = allServices?.filter(service => {
        return service.nama_jasa.toLowerCase().includes(lowerCaseSearchText)
    }) || []



    const [isSearching, setIsSearching] = React.useState(false);

    useEffect(() => {
        setIsSearching(true);
        const timer = setTimeout(() => {
            setIsSearching(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchText]);

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

    if (status === 'loading' || isSearching) {
        return (
            <div className='min-h-screen xl:px-[150px] lg:px-[100px] md:px-[55px] sm:px-[35px] px-[10px] py-[15px] flex flex-col gap-[15px]'>
                <p className='font-medium'>Mencari: {searchText}...</p>
                <div className='grid md:grid-cols-4 grid-cols-2 gap-x-1 gap-y-4 md:gap-x-2 md:gap-y-5 lg:gap-x-3 lg:gap-y-6'>
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
        <div className='min-h-screen xl:px-[150px] lg:px-[100px] md:px-[55px] sm:px-[35px] px-[10px] py-[15px] flex flex-col gap-[15px]'>
            <p className='font-medium'>Hasil Pencarian untuk: {searchText}</p>

            {serviceSearch.length === 0 && lowerCaseSearchText !== '' && (
                <p className='text-h5 text-gray-600'>Tidak ditemukan hasil untuk "{searchText}".</p>
            )}

            <div className='grid md:grid-cols-4 grid-cols-2 gap-x-1 gap-y-4 md:gap-x-2 md:gap-y-5 lg:gap-x-3 lg:gap-y-6'>
                {serviceSearch.map((service) => (
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

export default SearchPage