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
    
    useEffect(() => {
        if (user && user.id_seller) {
            if (ordersStatus === 'idle') {
                dispatch(getOrderBySellerId(user.id_seller));
            }
        }
    }, [dispatch, ordersStatus, user]);

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
    console.log(orders)
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
                status: order.status
            };
        });

        console.log(dashboardData);
    }

    const toggleDropdown = (orderId) => {
        setOpenDropdown(openDropdown === orderId ? null : orderId)
    }

    const handleHubungiPembeli = (orderId) => {
        console.log('Hubungi pembeli untuk order:', orderId)
        navigate('/dashboard/chat/'+orderId)
        // Tambahkan logic untuk hubungi pembeli
        setOpenDropdown(null)
    }

    const handleOrderanSelesai = (orderId) => {
        console.log('Menandai orderan selesai:', orderId)
        // Tambahkan logic untuk menandai orderan selesai
        dispatch(updateOrderStatus({
            orderId: orderId,
            status: 'selesai' // <-- HARUSNYA BEGINI
        }))
        setOpenDropdown(null)
    }
    console.log(updateError)
    return (
        <div className="w-full border border-gray-400 rounded-lg overflow-x-auto">
            {/* Table */}
            <table className="w-full text-left">
                {/* Header */}
                <thead className="bg-primary text-white font-bold rounded-lg">
                    <tr>
                        <th className="p-4 w-[20%]">Nama Pemesan</th>
                        <th className="px-4 py-3 w-[15%]">Jasa</th>
                        <th className="px-4 py-3 w-[18%]">Tanggal</th>
                        <th className="px-4 py-3 w-[10%]">Aksi</th>
                    </tr>
                </thead>
                {/* Body */}
                <tbody>
                    {dashboardData.map((order) => (
                        <tr key={order.order_id} className="border-t border-gray-400">
                            <td className="px-4 py-3 w-[20%]">
                                <div className="flex items-center space-x-2 w-full">
                                    <input type="checkbox" className="w-5 h-5 rounded-lg" />
                                    <div className="bg-gray-100 rounded-full h-8 w-8"></div>
                                </div>
                            </td>
                            <td className="px-4 py-3 w-[15%]">
                                {order?.nama_jasa}
                            </td>
                            <td className="px-4 py-3 w-[18%]">{order?.tanggal || 'Placeholder'}</td>
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

                                    {/* Dropdown Menu */}
                                    {openDropdown === order.order_id && (
                                        <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                                            <button
                                                onClick={() => handleHubungiPembeli(order.id_buyer)}
                                                className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm text-gray-700 border-b border-gray-200"
                                            >
                                                📞 Hubungi Pembeli
                                            </button>
                                            <button
                                                onClick={() => handleOrderanSelesai(order.order_id)}
                                                className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm text-gray-700"
                                            >
                                                ✅ Orderan Selesai
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
    )
}

export default TableAllOrder