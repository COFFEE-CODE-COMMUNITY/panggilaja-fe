import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser } from '../../../features/authSlice'
import { getAllServicesByIdSeller, resetServiceSeller, selectSellerServices, selectServiceSellerStatus } from '../../../features/sellerSlice'
import { Link } from 'react-router-dom'
import { deleteService, resetDeleteStatus, selectDeleteServiceStatus } from '../../../features/serviceSlice'
import Button from '../../../components/common/Button'
import { FaTimes } from 'react-icons/fa' // Pastikan FaTimes diimpor
import Input from '../../../components/common/Input'

const TableServices = () => {
    const user = useSelector(selectCurrentUser)
    const dispatch = useDispatch()

    const [search, setSearch] = useState('')

    const servicesSeller = useSelector(selectSellerServices)
    const status = useSelector(selectServiceSellerStatus)

    const statusDelete = useSelector(selectDeleteServiceStatus)

    const [activeServiceId, setActiveServiceId] = useState(null) 

    const findServiceSeller = servicesSeller?.data?.filter((service) => service?.nama_jasa?.toLowerCase().includes(search.toLowerCase()))

    const toggleModal = (serviceId) => {
        setActiveServiceId(activeServiceId === serviceId ? null : serviceId);
    };

    const handleDelete = (serviceId) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus layanan ini?")) {
            dispatch(deleteService(serviceId));
            setActiveServiceId(null); 
        }
    };


    useEffect(() => {
        if (user && user.id_seller) { 
            dispatch(getAllServicesByIdSeller(user.id_seller));
        }
    }, [dispatch, user, statusDelete]); 

    useEffect(() => {
        if (statusDelete === 'success') {
            if (user?.id_seller) {
                dispatch(getAllServicesByIdSeller(user?.id_seller)); 
                dispatch(resetDeleteStatus())
            }
        }
    }, [dispatch, statusDelete, user?.id_seller]) 

    // Render loading state
    if (status === 'loading') {
        return <p>Memuat layanan...</p>
    }

    return (
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
            <table className="w-full text-left border border-gray-400 rounded-xl overflow-hidden">
                {/* Header */}
                <thead className="bg-primary text-white font-bold ">
                    <tr>
                    <th className="p-4 w-[20%] col-span-2">
                        Gambar
                    </th>
                    <th className="px-4 py-3 w-[15%]">
                        Nama Jasa
                    </th>
                    <th className="px-4 py-3 w-[10%]">Aksi</th>
                    </tr>
                </thead>
                {/* Body */}
                <tbody>                    
                    {search ? (
                        findServiceSeller?.map((service) => (
                            <tr key={service.id} className="border-t border-gray-400 ">
                                <td className="px-4 py-3 w-[20%]">
                                    <div className="flex items-center space-x-2 w-full">
                                        <img 
                                            src={service?.foto_product} 
                                            alt={`Gambar ${service.nama_jasa}`}
                                            className='w-16 h-16 object-cover rounded-md'
                                        />
                                    </div>
                                </td>
                                <td className="px-4 py-3 w-[15%] align-text-top font-semibold">
                                    {service.nama_jasa}
                                </td>                        
                                {/* Kolom Aksi */}
                                <td className="p-1 w-[10%] align-text-top">
                                    <div className=" flex w-full justify-end relative">
                                        
                                        {/* Modal Action */}
                                        {activeServiceId === service.id && (
                                            // MODIFIKASI: Tambahkan tombol FaTimes di dalam div modal
                                            <div className='absolute right-7 -top-15 mt-8 bg-white border border-gray-300 rounded-xl w-36 shadow-lg z-10'>
                                                {/* Tombol Tutup */}
                                                <button 
                                                    className='absolute top-1 right-1 text-gray-500 hover:text-gray-900 p-1 rounded-full'
                                                    onClick={() => setActiveServiceId(null)} 
                                                    aria-label="Tutup modal aksi"
                                                >
                                                    <FaTimes size={12} />
                                                </button>
                                                
                                                <Link to={`/dashboard/manage-services/edit-service/${service.id}`}>
                                                    <p 
                                                        className='hover:bg-primary hover:text-white p-2 pt-4 cursor-pointer rounded-t-xl text-sm whitespace-nowrap'
                                                        onClick={() => setActiveServiceId(null)}
                                                    >
                                                        Edit Layanan
                                                    </p>
                                                </Link>
                                                <p 
                                                    className='hover:bg-primary hover:text-white p-2 cursor-pointer rounded-b-xl text-sm whitespace-nowrap'
                                                    onClick={() => handleDelete(service.id)}
                                                >
                                                    Hapus Layanan
                                                </p>
                                            </div>
                                        )}

                                        {/* Tombol Buka Aksi */}
                                        <button 
                                            className="flex flex-col gap-y-1 text-black hover:text-gray-600 mr-5 cursor-pointer p-2"
                                            onClick={() => toggleModal(service.id)}
                                        >
                                            <span className="bg-black h-1 w-1 rounded-full"></span>
                                            <span className="bg-black h-1 w-1 rounded-full"></span>
                                            <span className="bg-black h-1 w-1 rounded-full"></span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        servicesSeller?.data.map((service) => (
                            <tr key={service.id} className="border-t border-gray-400 ">
                                <td className="px-4 py-3 w-[20%]">
                                    <div className="flex items-center space-x-2 w-full">
                                        <img 
                                            src={service?.foto_product} 
                                            alt={`Gambar ${service.nama_jasa}`}
                                            className='w-16 h-16 object-cover rounded-md'
                                        />
                                    </div>
                                </td>
                                <td className="px-4 py-3 w-[15%] align-text-top font-semibold">
                                    {service.nama_jasa}
                                </td>                        
                                {/* Kolom Aksi */}
                                <td className="p-1 w-[10%] align-text-top">
                                    <div className=" flex w-full justify-end relative">
                                        
                                        {/* Modal Action */}
                                        {activeServiceId === service.id && (
                                            // MODIFIKASI: Tambahkan tombol FaTimes di dalam div modal
                                            <div className='absolute right-7 -top-15 mt-8 bg-white border border-gray-300 rounded-xl w-36 shadow-lg z-10'>
                                                {/* Tombol Tutup */}
                                                <button 
                                                    className='absolute top-1 right-1 text-gray-500 hover:text-gray-900 p-1 rounded-full'
                                                    onClick={() => setActiveServiceId(null)} 
                                                    aria-label="Tutup modal aksi"
                                                >
                                                    <FaTimes size={12} />
                                                </button>
                                                
                                                <Link to={`/dashboard/manage-services/edit-service/${service.id}`}>
                                                    <p 
                                                        className='hover:bg-primary hover:text-white p-2 pt-4 cursor-pointer rounded-t-xl text-sm whitespace-nowrap'
                                                        onClick={() => setActiveServiceId(null)}
                                                    >
                                                        Edit Layanan
                                                    </p>
                                                </Link>
                                                <p 
                                                    className='hover:bg-primary hover:text-white p-2 cursor-pointer rounded-b-xl text-sm whitespace-nowrap'
                                                    onClick={() => handleDelete(service.id)}
                                                >
                                                    Hapus Layanan
                                                </p>
                                            </div>
                                        )}

                                        {/* Tombol Buka Aksi */}
                                        <button 
                                            className="flex flex-col gap-y-1 text-black hover:text-gray-600 mr-5 cursor-pointer p-2"
                                            onClick={() => toggleModal(service.id)}
                                        >
                                            <span className="bg-black h-1 w-1 rounded-full"></span>
                                            <span className="bg-black h-1 w-1 rounded-full"></span>
                                            <span className="bg-black h-1 w-1 rounded-full"></span>
                                        </button>
                                    </div>
                                </td>
                            </tr>                
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default TableServices