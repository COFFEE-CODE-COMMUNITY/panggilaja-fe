import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser } from '../../../features/authSlice'
import { getAllServicesByIdSeller, getOrderBySellerId, selectOrderSeller, selectOrderSellerMessage, selectOrderSellerStatus, selectSellerServices } from '../../../features/sellerSlice'
import { selectAllService } from '../../../features/serviceSlice'
import { useNavigate } from 'react-router-dom'
import { selectUpdateOrderError, selectUpdateOrderStatus, updateOrderStatus } from '../../../features/orderSlice'

const TableAllOrder = () => {
    const user = useSelector(selectCurrentUser)
    const dispatch = useDispatch()
    const orders = useSelector(selectOrderSeller)
    const ordersStatus = useSelector(selectOrderSellerStatus)
    const ordersMessage = useSelector(selectOrderSellerMessage)
    const allService = useSelector(selectSellerServices)
    const navigate = useNavigate()
    // State untuk manage dropdown yang terbuka
    const [openDropdown, setOpenDropdown] = useState(null)
    const updateStatus = useSelector(selectUpdateOrderStatus)
    const updateError = useSelector(selectUpdateOrderError)
    
    console.log(orders)

    useEffect(() => {
        if (user && user.id_seller) {
            if (ordersStatus === 'idle') {
                dispatch(getOrderBySellerId(user.id_seller));
            }
        }
    }, [dispatch, ordersStatus, user, orders?.data?.status, orders?.data]);

    // Close dropdown ketika klik di luar
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.dropdown-container')) {
                setOpenDropdown(null)
            }
        }
        
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [])
    
    let dashboardData = [];
    // Pastikan kedua data sudah ada
    if (orders && allService) {
        // 1. Buat 'peta' dari allService agar pencarian cepat
        const serviceMap = new Map(
            allService.data.map(service => [service.id, service])
        );

        // 2. Loop (map) data order kamu
        dashboardData = orders.data.map((order) => {
            // 3. Cari detail service yang cocok pakai serviceMap
            const serviceDetail = serviceMap.get(order.service_id);

            // 4. Gabungkan datanya jadi objek baru
            return {
                order_id: order.id, 
                nama_jasa: serviceDetail ? serviceDetail.nama_jasa : 'Jasa Tidak Ditemukan',
                id_buyer : order.buyer_id,
                tanggal: order.tanggal,
                status: order.status,
                nama_buyer : order.buyer.fullname
            };
        });

    }

    const toggleDropdown = (orderId) => {
        setOpenDropdown(openDropdown === orderId ? null : orderId)
    }

    const handleHubungiPembeli = async (buyerId) => {
        console.log('Hubungi pembeli untuk order:', buyerId)
        
        try {
            const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
            
            // ✅ Buat/ambil room chat
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api'}/chat/room`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    id_buyer: buyerId,
                    id_seller: user.id_seller
                })
            })
            
            const data = await response.json()
            
            if (data.success) {
                console.log('✅ Room chat berhasil dibuat/diambil')
            }
            
            // ✅ PENTING: Navigate dengan state shouldRefreshList
            navigate('/dashboard/chat/' + buyerId, {
                state: { shouldRefreshList: true } // ← Force refresh contact list
            })
            
        } catch (error) {
            console.error('Error saat membuat room chat:', error)
            // Tetap navigate dengan refresh flag
            navigate('/dashboard/chat/' + buyerId, {
                state: { shouldRefreshList: true }
            })
        }
        
        setOpenDropdown(null)
    }

    const handleOrderanSelesai = (orderId) => {
        console.log('Menandai orderan selesai:', orderId)
        // Tambahkan logic untuk menandai orderan selesai
        dispatch(updateOrderStatus({
            orderId: orderId,
            status: 'completed'
        }))
        setOpenDropdown(null)
    }
    
    
    return (
        <div className="w-full">
            {/* Desktop View - Hidden on mobile */}
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
                        {dashboardData.map((order) => (
                            <tr key={order.order_id} className="border-t border-gray-400">
                                <td className="px-4 py-3 w-[20%]">
                                    <p>{order?.nama_buyer}</p>
                                </td>
                                <td className="px-4 py-3 w-[15%]">
                                    {order?.nama_jasa}
                                </td>
                                <td className="px-4 py-3 w-[18%]">{order?.tanggal || 'Placeholder'}</td>
                                <td className="px-4 py-3 w-[18%]">{order?.status}</td>
                                <td className="px-4 py-3 w-[10%]">
                                    <div className="flex w-full justify-end relative dropdown-container">
                                        <button 
                                            onClick={() => toggleDropdown(order.order_id)}
                                            className="flex flex-col gap-y-1 text-black hover:text-gray-600 mr-5 p-2"
                                        >
                                            <span className="bg-black h-1 w-1 rounded-full"></span>
                                            <span className="bg-black h-1 w-1 rounded-full"></span>
                                            <span className="bg-black h-1 w-1 rounded-full"></span>
                                        </button>

                                        {openDropdown === order.order_id && (
                                            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                                                <button
                                                    onClick={() => handleHubungiPembeli(order.id_buyer)}
                                                    className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm text-gray-700 border-b border-gray-200 hover:bg-primary hover:text-white"
                                                >
                                                    Hubungi Pembeli
                                                </button>
                                                <button
                                                    onClick={() => handleOrderanSelesai(order.order_id)}
                                                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-primary hover:text-white"
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
                {dashboardData.map((order) => (
                    <div key={order.order_id} className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
                        {/* Header Card */}
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                                <div>
                                    <p className="text-xs text-gray-500">Nama Pemesan</p>
                                    <p className="font-medium text-sm">{order.nama_buyer}</p>
                                </div>
                            </div>
                            
                            {/* Dropdown Button */}
                            <div className="relative dropdown-container">
                                <button 
                                    onClick={() => toggleDropdown(order.order_id)}
                                    className="flex flex-col gap-y-1 text-black hover:text-gray-600 p-2"
                                >
                                    <span className="bg-black h-1 w-1 rounded-full"></span>
                                    <span className="bg-black h-1 w-1 rounded-full"></span>
                                    <span className="bg-black h-1 w-1 rounded-full"></span>
                                </button>

                                {openDropdown === order.order_id && (
                                    <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                                        <button
                                            onClick={() => handleHubungiPembeli(order.id_buyer)}
                                            className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm text-gray-700 border-b border-gray-200"
                                        >
                                            Hubungi Pembeli
                                        </button>
                                        <button
                                            onClick={() => handleOrderanSelesai(order.order_id)}
                                            className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm text-gray-700"
                                        >
                                            Orderan Selesai
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

export default TableAllOrder