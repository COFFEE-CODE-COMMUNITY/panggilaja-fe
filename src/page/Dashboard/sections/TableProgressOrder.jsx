import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser } from '../../../features/authSlice'
import { getAllServicesByIdSeller, getOrderBySellerId, selectOrderSeller, selectOrderSellerMessage, selectOrderSellerStatus, selectSellerServices } from '../../../features/sellerSlice'
import { selectAllService } from '../../../features/serviceSlice'
import { useNavigate } from 'react-router-dom'
import { selectUpdateOrderError, selectUpdateOrderStatus, updateOrderStatus } from '../../../features/orderSlice'

const TableProgressOrder = () => {
    const user = useSelector(selectCurrentUser)
    const dispatch = useDispatch()
    const orders = useSelector(selectOrderSeller)
    const ordersStatus = useSelector(selectOrderSellerStatus)
    const ordersMessage = useSelector(selectOrderSellerMessage)
    const allService = useSelector(selectSellerServices)
    const navigate = useNavigate()
    const [openDropdown, setOpenDropdown] = useState(null)
    const updateStatus = useSelector(selectUpdateOrderStatus)
    const updateError = useSelector(selectUpdateOrderError)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event?.target?.closest('?.dropdown-container')) {
                setOpenDropdown(null)
            }
        }
        
        document?.addEventListener('click', handleClickOutside)
        return () => document?.removeEventListener('click', handleClickOutside)
    }, [])
    
    let dashboardData = [];
    if (orders && allService) {
        const serviceMap = new Map(
            allService?.data?.map(service => [service?.id, service])
        );

        dashboardData = orders?.data?.map((order) => {
            const serviceDetail = serviceMap?.get(order?.service_id);

            return {
                order_id: order?.id, 
                nama_jasa: serviceDetail ? serviceDetail?.nama_jasa : 'Jasa Tidak Ditemukan',
                id_buyer : order?.buyer_id,
                tanggal: order?.tanggal,
                status: order?.status,
                nama_buyer : order?.buyer?.fullname
            };
        });
    }

    const dashboardDataFilterProgress = dashboardData?.filter((data) => data?.status === 'in_progress')
    const toggleDropdown = (orderId) => {
        setOpenDropdown(openDropdown === orderId ? null : orderId)
    }

    const handleHubungiPembeli = (orderId) => {
        console?.log('Hubungi pembeli untuk order:', orderId)
        navigate('/dashboard/chat/'+orderId)
        setOpenDropdown(null)
    }

    const handleOrderanSelesai = (orderId) => {
        console?.log('Menandai orderan selesai:', orderId)
        dispatch(updateOrderStatus({
            orderId: orderId,
            status: 'selesai'
        }))
        setOpenDropdown(null)
    }
    
    
    return (
        <div className="w-full sm:mb-0 mb-20">
            <div className="hidden md:block border border-gray-400 rounded-lg">
                <table className="w-full text-left">
                    <thead className="bg-primary text-white font-bold rounded-lg">
                        <tr>
                            <th className="p-4 w-[20%]">Nama Pemesan</th>
                            <th className="px-4 py-3 w-[15%]">Jasa</th>
                            <th className="px-4 py-3 w-[18%]">Tanggal</th>
                            <th className="px-4 py-3 w-[18%]">Status</th>
                            <th className="px-4 py-3 w-[10%]">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dashboardDataFilterProgress?.length === 0 && (
                            <tr>
                            <td colSpan="100%" className="px-4 py-16">
                                <div className="flex flex-col items-center justify-center text-center">
                                {/* Icon */}
                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <svg 
                                    className="w-10 h-10 text-gray-400" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                    >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5?.586a1 1 0 01?.707?.293l5?.414 5?.414a1 1 0 01?.293?.707V19a2 2 0 01-2 2z" 
                                    />
                                    </svg>
                                </div>
                                
                                {/* Text */}
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                    Belum Ada Pesanan
                                </h3>
                                <p className="text-sm text-gray-500 max-w-md">
                                    Pesanan yang sedang dalam proses akan muncul di sini?. Mulai terima pesanan pertama Anda!
                                </p>
                                </div>
                            </td>
                            </tr>
                        )}
                        {dashboardDataFilterProgress?.map((order) => (
                            <tr key={order?.order_id} className="border-t border-gray-400">
                                <td className="px-4 py-3 w-[20%]">
                                    <div className="flex items-center space-x-2 w-full">
                                        <input type="checkbox" className="w-5 h-5 rounded-lg" />
                                    </div>
                                </td>
                                <td className="px-4 py-3 w-[15%]">
                                    {order?.nama_jasa}
                                </td>
                                <td className="px-4 py-3 w-[18%]">{order?.tanggal || 'Placeholder'}</td>
                                <td className="px-4 py-3 w-[18%]">{order?.status}</td>
                                <td className="px-4 py-3 w-[10%]">
                                    <div className="flex w-full justify-end relative dropdown-container">
                                        <button 
                                            onClick={() => toggleDropdown(order?.order_id)}
                                            className="flex flex-col gap-y-1 text-black hover:text-gray-600 mr-5 p-2"
                                        >
                                            <span className="bg-black h-1 w-1 rounded-full"></span>
                                            <span className="bg-black h-1 w-1 rounded-full"></span>
                                            <span className="bg-black h-1 w-1 rounded-full"></span>
                                        </button>

                                        {openDropdown === order?.order_id && (
                                            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                                                <button
                                                    onClick={() => handleHubungiPembeli(order?.id_buyer)}
                                                    className="hover:bg-primary hover:text-white w-full text-left px-4 py-3 text-sm text-gray-700 border-b border-gray-200"
                                                >
                                                    Hubungi Pembeli
                                                </button>
                                                <button
                                                    onClick={() => handleOrderanSelesai(order?.order_id)}
                                                    className="hover:bg-primary hover:text-white w-full text-left px-4 py-3 text-sm text-gray-700"
                                                >
                                                    Orderan Selesai
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile View - Card Layout */}
            <div className="md:hidden space-y-3">
                {dashboardDataFilterProgress?.length === 0 && (
                <tr>
                <td colSpan="100%" className="px-4 py-16">
                    <div className="flex flex-col items-center justify-center text-center">
                    {/* Icon */}
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <svg 
                        className="w-10 h-10 text-gray-400" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5?.586a1 1 0 01?.707?.293l5?.414 5?.414a1 1 0 01?.293?.707V19a2 2 0 01-2 2z" 
                        />
                        </svg>
                    </div>
                    
                    {/* Text */}
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        Belum Ada Pesanan
                    </h3>
                    <p className="text-sm text-gray-500 max-w-md">
                        Pesanan yang telah selesai akan muncul di sini?. Mulai terima pesanan pertama Anda!
                    </p>
                    </div>
                </td>
                </tr>
            )}
                {dashboardDataFilterProgress?.map((order) => (
                    <div key={order?.order_id} className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
                        {/* Header Card */}
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                                <div>
                                    <p className="text-xs text-gray-500">Nama Pemesan</p>
                                    <p className="font-medium text-sm">{order?.nama_buyer}</p>
                                </div>
                            </div>
                            
                            {/* Dropdown Button */}
                            <div className="relative dropdown-container">
                                <button 
                                    onClick={() => toggleDropdown(order?.order_id)}
                                    className="flex flex-col gap-y-1 text-black hover:text-gray-600 p-2"
                                >
                                    <span className="bg-black h-1 w-1 rounded-full"></span>
                                    <span className="bg-black h-1 w-1 rounded-full"></span>
                                    <span className="bg-black h-1 w-1 rounded-full"></span>
                                </button>

                                {openDropdown === order?.order_id && (
                                    <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                                        <button
                                            onClick={() => handleHubungiPembeli(order?.id_buyer)}
                                            className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm text-gray-700 border-b border-gray-200"
                                        >
                                            📞 Hubungi Pembeli
                                        </button>
                                        <button
                                            onClick={() => handleOrderanSelesai(order?.order_id)}
                                            className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm text-gray-700"
                                        >
                                            ✅ Orderan Selesai
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Content Card */}
                        <div className="space-y-2 border-t border-gray-200 pt-3">
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">Jasa:</span>
                                <span className="text-sm font-medium text-gray-800">{order?.nama_jasa}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">Tanggal:</span>
                                <span className="text-sm text-gray-800">{order?.tanggal || 'Placeholder'}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">Status:</span>
                                <span className={`text-sm font-medium px-2 py-1 rounded ${
                                    order?.status === 'selesai' ? 'bg-green-100 text-green-700' :
                                    order?.status === 'proses' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-gray-100 text-gray-700'
                                }`}>
                                    {order?.status}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TableProgressOrder