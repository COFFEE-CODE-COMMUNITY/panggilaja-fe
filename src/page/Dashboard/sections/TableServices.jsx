import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser } from '../../../features/authSlice'
import { getAllServicesByIdSeller, resetServiceSeller, selectSellerServices, selectServiceSellerStatus } from '../../../features/sellerSlice'
import { Link } from 'react-router-dom'
import { deleteService, resetDeleteStatus, selectDeleteServiceStatus } from '../../../features/serviceSlice'
import Button from '../../../components/common/Button'
import { FaTimes } from 'react-icons/fa' // Pastikan FaTimes diimpor
import Input from '../../../components/common/Input'
import ModalDeleteService from '../../../components/modules/Modal/ModalDeleteService'

const TableServices = () => {
    const user = useSelector(selectCurrentUser)
    const dispatch = useDispatch()

    const [search, setSearch] = useState('')
    const [activeServiceId, setActiveServiceId] = useState(null)
    const [deleteModal, setDeleteModal] = useState(false)

    const servicesSeller = useSelector(selectSellerServices)
    const status = useSelector(selectServiceSellerStatus)

    const statusDelete = useSelector(selectDeleteServiceStatus)

    const findServiceSeller = servicesSeller?.data?.filter((service) => service?.nama_jasa?.toLowerCase().includes(search.toLowerCase()))

    const toggleModal = (serviceId) => {
        setActiveServiceId(activeServiceId === serviceId ? null : serviceId);
    };

    useEffect(() => {
        if (user && user.id_seller) {
            dispatch(getAllServicesByIdSeller(user.id_seller));
        }
    }, [dispatch, user]);

    useEffect(() => {
        if (statusDelete === 'success') {
            if (user?.id_seller) {
                dispatch(getAllServicesByIdSeller(user?.id_seller));
                dispatch(resetDeleteStatus())
            }
            setDeleteModal(false)
        }
    }, [dispatch, statusDelete, user?.id_seller])

    const [isArtificialLoading, setIsArtificialLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsArtificialLoading(false);
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    const ManageServiceSkeleton = () => (
        <div className="flex flex-col gap-2 sm:mb-0 mb-20">
            <div className='flex gap-5 items-center'>
                <div className="flex-1 h-12 bg-gray-200 rounded-full animate-pulse" />
                <div className="w-32 h-12 bg-gray-200 rounded-xl animate-pulse" />
            </div>

            {/* Desktop Header Skeleton */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-100 rounded-t-lg items-center animate-pulse mt-4">
                <div className="col-span-2 h-6 bg-gray-200 rounded" />
                <div className="col-span-5 h-6 bg-gray-200 rounded" />
                <div className="col-span-2 h-6 bg-gray-200 rounded" />
                <div className="col-span-3 h-6 bg-gray-200 rounded" />
            </div>

            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                        {/* Desktop Skeleton */}
                        <div className="hidden md:block bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <div className="p-6 grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-2">
                                    <div className="w-16 h-16 bg-gray-200 rounded-lg" />
                                </div>
                                <div className="col-span-5">
                                    <div className="h-6 bg-gray-200 rounded w-1/2" />
                                </div>
                                <div className="col-span-2">
                                    <div className="h-6 bg-gray-200 rounded w-2/3" />
                                </div>
                                <div className="col-span-3 flex justify-end gap-2">
                                    <div className="w-16 h-8 bg-gray-200 rounded-lg" />
                                    <div className="w-16 h-8 bg-gray-200 rounded-lg" />
                                </div>
                            </div>
                        </div>

                        {/* Mobile Skeleton */}
                        <div className="md:hidden bg-white border border-gray-300 rounded-lg p-4 relative">
                            <div className="flex gap-4">
                                <div className="w-20 h-20 bg-gray-200 rounded-lg shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                                </div>
                            </div>
                            <div className="mt-4 flex gap-2">
                                <div className="flex-1 h-10 bg-gray-200 rounded-lg" />
                                <div className="flex-1 h-10 bg-gray-200 rounded-lg" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // Render loading state
    if (status === 'loading' || isArtificialLoading) {
        return <ManageServiceSkeleton />
    }

    return (
        <>
            <div className="flex flex-col gap-2 sm:mb-0 mb-20">
                <div className='flex gap-5 items-center'>
                    <Input
                        placeholder="Cari jasa sekarang"
                        className="flex-1 border-2 border-gray-200 rounded-full text-h5 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button
                        variant='primary'
                        className='px-5 py-3 text-white rounded-xl'
                        to={`/dashboard/manage-services/add-service`}
                    >
                        Tambah Jasa
                    </Button>
                </div>
                {/* Table */}
                {/* Global Header - Desktop Only */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-primary text-white font-bold rounded-t-lg items-center">
                    <div className="col-span-2">Gambar</div>
                    <div className="col-span-5">Nama Jasa</div>
                    <div className="col-span-2">Harga</div>
                    <div className="col-span-3 text-right">Aksi</div>
                </div>

                <div className="space-y-4">
                    {servicesSeller?.data?.length === 0 ? (
                        <div className="p-8 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Belum Ada Layanan</h3>
                            <p className="text-sm text-gray-500 max-w-md mx-auto">Anda belum menambahkan layanan apapun. Mulai tambahkan layanan untuk menarik pelanggan!</p>
                        </div>
                    ) : (
                        (search ? findServiceSeller : servicesSeller?.data)?.map((service) => (
                            <React.Fragment key={service.id}>
                                {/* Desktop View Card */}
                                <div className="hidden md:block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="p-6 grid grid-cols-12 gap-4 items-center">
                                        {/* Gambar (Col 2) */}
                                        <div className="col-span-2">
                                            <Link to={`/dashboard/service/${service.id}`}>
                                                <img
                                                    src={service?.foto_product}
                                                    alt={service.nama_jasa}
                                                    className="w-16 h-16 object-cover rounded-lg border border-gray-100"
                                                />
                                            </Link>
                                        </div>

                                        {/* Nama Jasa (Col 5) */}
                                        <div className="col-span-5">
                                            <Link
                                                to={`/dashboard/service/${service.id}`}
                                                className="text-lg font-semibold text-gray-800 hover:text-primary transition-colors"
                                            >
                                                {service.nama_jasa}
                                            </Link>
                                        </div>

                                        {/* Harga (Col 2) */}
                                        <div className="col-span-2">
                                            <p className="font-semibold text-primary">
                                                {service?.base_price === service?.top_price
                                                    ? `Rp ${service?.base_price?.toLocaleString('id-ID')}`
                                                    : `Rp ${service?.base_price?.toLocaleString('id-ID')} - ${service?.top_price?.toLocaleString('id-ID')}`
                                                }
                                            </p>
                                        </div>

                                        {/* Aksi (Col 3) */}
                                        <div className="col-span-3 flex justify-end gap-2">
                                            <Link
                                                to={`/dashboard/manage-services/edit-service/${service.id}`}
                                                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200 transition-colors"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    setActiveServiceId(service.id);
                                                    setDeleteModal(true);
                                                }}
                                                className="px-4 py-2 rounded-lg border border-red-500 text-red-500 bg-white text-sm font-medium hover:bg-red-50 transition-colors"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Mobile View Card */}
                                <div className="md:hidden bg-white border border-gray-300 rounded-lg p-4 shadow-sm relative">
                                    <div className="flex gap-4">
                                        <Link to={`/dashboard/service/${service.id}`} className="shrink-0">
                                            <img
                                                src={service?.foto_product}
                                                alt={service.nama_jasa}
                                                className="w-20 h-20 object-cover rounded-lg border border-gray-100"
                                            />
                                        </Link>
                                        <div className="flex-1 min-w-0">
                                            <Link
                                                to={`/dashboard/service/${service.id}`}
                                                className="text-base font-semibold text-gray-800 hover:text-primary transition-colors line-clamp-2 mb-1"
                                            >
                                                {service.nama_jasa}
                                            </Link>
                                            <p className="text-primary font-bold text-sm mt-1">
                                                {service?.base_price === service?.top_price
                                                    ? `Rp ${service?.base_price?.toLocaleString('id-ID')}`
                                                    : `Rp ${service?.base_price?.toLocaleString('id-ID')} - ${service?.top_price?.toLocaleString('id-ID')}`
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex gap-2">
                                        <Link
                                            to={`/dashboard/manage-services/edit-service/${service.id}`}
                                            className="flex-1 text-center py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setActiveServiceId(service.id);
                                                setDeleteModal(true);
                                            }}
                                            className="flex-1 py-2 rounded-lg border border-red-500 text-red-500 bg-white text-sm font-medium hover:bg-red-50 transition-colors cursor-pointer"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            </React.Fragment>
                        ))
                    )}
                </div>

                {deleteModal && (
                    <ModalDeleteService
                        isLoading={statusDelete === 'loading'}
                        onSubmit={() => activeServiceId && dispatch(deleteService(activeServiceId))}
                        onCancel={() => {
                            if (statusDelete === 'loading') return;
                            setDeleteModal(false);
                            setActiveServiceId(null);
                        }}
                    />
                )}
            </div>
        </>
    )
}

export default TableServices