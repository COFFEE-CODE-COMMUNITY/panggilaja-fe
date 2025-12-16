import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser } from '../../../features/authSlice'
import { getAllServicesByIdSeller, getOrderBySellerId, selectOrderSeller, selectOrderSellerMessage, selectOrderSellerStatus, selectSellerServices } from '../../../features/sellerSlice'
import { selectAllService } from '../../../features/serviceSlice'
import { useNavigate } from 'react-router-dom'
import { selectUpdateOrderError, selectUpdateOrderStatus, updateOrderStatus, clearOrderStatus } from '../../../features/orderSlice'
import { FaUser } from "react-icons/fa";
import Modal from '../../../components/common/Modal';

const TableAllOrder = () => {
    const user = useSelector(selectCurrentUser)
    const dispatch = useDispatch()
    const orders = useSelector(selectOrderSeller)
    const ordersStatus = useSelector(selectOrderSellerStatus)
    const ordersMessage = useSelector(selectOrderSellerMessage)
    const allService = useSelector(selectSellerServices)
    const navigate = useNavigate()
    // State untuk manage dropdown yang terbuka
    const updateStatus = useSelector(selectUpdateOrderStatus)
    const updateError = useSelector(selectUpdateOrderError)

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    // Refresh orders when updateStatus is success
    useEffect(() => {
        if (updateStatus === 'success' && user?.id_seller) {
            dispatch(getOrderBySellerId(user?.id_seller));
            dispatch(clearOrderStatus());
        }
    }, [updateStatus, user?.id_seller, dispatch]);

    // Close modal when success
    useEffect(() => {
        if (updateStatus === 'success') {
            setShowConfirmModal(false);
            setSelectedOrderId(null);
        }
    }, [updateStatus]);

    console.log(orders)

    const formatDate = (dateString) => {
        if (!dateString) return 'Tanggal tidak tersedia';
        return new Date(dateString).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    let dashboardData = [];
    // Pastikan kedua data sudah ada
    if (orders && allService) {
        // 1?. Buat 'peta' dari allService agar pencarian cepat
        const serviceMap = new Map(
            allService?.data?.map(service => [service?.id, service])
        );

        // 2?. Loop (map) data order kamu
        dashboardData = orders?.data?.map((order) => {
            // 3?. Cari detail service yang cocok pakai serviceMap
            const serviceDetail = serviceMap?.get(order?.service_id);

            const addr = order?.buyer?.alamat?.[0];
            const fullAddress = addr ?
                [addr.alamat, addr.kecamatan, addr.kota, addr.provinsi, addr.kode_pos].filter(Boolean).join(', ')
                : 'Alamat tidak tersedia';

            return {
                order_id: order?.id,
                nama_jasa: serviceDetail ? serviceDetail?.nama_jasa : 'Jasa Tidak Ditemukan',
                id_buyer: order?.buyer_id,
                tanggal: formatDate(order?.tanggal),
                status: order?.status,
                foto_buyer: order?.buyer?.foto_buyer,
                nama_buyer: order?.buyer?.fullname,
                alamat: fullAddress
            };
        });
    }

    const handleHubungiPembeli = async (buyerId) => {
        console?.log('Hubungi pembeli untuk order:', buyerId)

        try {
            const token = localStorage?.getItem('accessToken') || sessionStorage?.getItem('accessToken')

            // ✅ Buat/ambil room chat
            const response = await fetch(`${process?.env?.REACT_APP_API_BASE_URL || 'http://localhost:5000/api'}/chat/room`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    id_buyer: buyerId,
                    id_seller: user?.id_seller
                })
            })

            const data = await response?.json()

            if (data?.success) {
                console?.log('✅ Room chat berhasil dibuat/diambil')
            }

            // ✅ PENTING: Navigate dengan state shouldRefreshList
            navigate('/dashboard/chat/' + buyerId, {
                state: { shouldRefreshList: true } // ← Force refresh contact list
            })

        } catch (error) {
            console?.error('Error saat membuat room chat:', error)
            // Tetap navigate dengan refresh flag
            navigate('/dashboard/chat/' + buyerId, {
                state: { shouldRefreshList: true }
            })
        }

        // setOpenDropdown(null) // This line was commented out or removed in the original context, but was present in the instruction snippet. Re-adding if it was intended.
    }

    const handleOrderanSelesai = (orderId) => {
        setSelectedOrderId(orderId);
        setShowConfirmModal(true);
    }

    const confirmFinishOrder = () => {
        if (selectedOrderId) {
            console?.log('Menandai orderan selesai:', selectedOrderId)
            dispatch(updateOrderStatus({
                orderId: selectedOrderId,
                status: 'completed'
            }));
        }
    }


    return (
        <div className="w-full sm:mb-0 mb-20">
            {/* Desktop View - Hidden on mobile */}
            <div className="hidden md:block">
                {/* Global Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-primary text-white font-bold rounded-t-lg items-center">
                    <div className="col-span-5">Produk & Alamat</div>
                    <div className="col-span-2">Tanggal</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-3 text-right">Aksi</div>
                </div>

                <div className="space-y-4 mt-2">
                    {dashboardData?.length === 0 && (
                        <div className="p-8 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Belum Ada Pesanan</h3>
                            <p className="text-sm text-gray-500 max-w-md mx-auto">
                                Pesanan yang telah selesai akan muncul di sini. Mulai terima pesanan pertama Anda!
                            </p>
                        </div>
                    )}

                    {dashboardData?.map((order) => (
                        <div key={order?.order_id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                            {/* Buyer Header */}
                            <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {order?.foto_buyer ? (
                                        <img
                                            src={order.foto_buyer}
                                            alt={order.nama_buyer}
                                            className="w-6 h-6 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xs">
                                            <FaUser />
                                        </div>
                                    )}
                                    <span className="font-semibold text-gray-700 text-sm">{order?.nama_buyer}</span>
                                </div>
                                <span className="text-xs text-gray-400">Order ID: {order?.order_id}</span>
                            </div>

                            {/* Card Body */}
                            <div className="p-6 grid grid-cols-12 gap-4 items-center">
                                {/* Product & Address (Col 5) */}
                                <div className="col-span-5 pr-4">
                                    <h4 className="font-bold text-gray-800 text-base mb-1">{order?.nama_jasa}</h4>
                                    <p className="text-sm text-gray-500 line-clamp-2">{order?.alamat}</p>
                                </div>

                                {/* Date (Col 2) */}
                                <div className="col-span-2">
                                    <p className="text-sm text-gray-600">{order?.tanggal}</p>
                                </div>

                                {/* Status (Col 2) */}
                                <div className="col-span-2">
                                    <span className={`text-xs font-semibold px-2 py-1 rounded inline-block ${order?.status === 'selesai' || order?.status === 'completed' ? 'bg-green-100 text-green-700' :
                                        (order?.status === 'proses' || order?.status === 'in_progress') ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-gray-100 text-gray-700'
                                        }`}>
                                        {order?.status === 'in_progress' ? 'Proses' : (order?.status === 'completed' ? 'Selesai' : order?.status)}
                                    </span>
                                </div>

                                {/* Action (Col 3) */}
                                <div className="col-span-3 flex justify-end gap-2">
                                    <button
                                        onClick={() => handleHubungiPembeli(order?.id_buyer)}
                                        className="cursor-pointer px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200 transition-colors"
                                    >
                                        Hubungi
                                    </button>
                                    <button
                                        onClick={() => handleOrderanSelesai(order?.order_id)}
                                        disabled={order?.status === 'completed' || order?.status === 'selesai'}
                                        className="cursor-pointer px-4 py-2 rounded-lg border border-primary text-primary bg-white text-sm font-medium hover:bg-primary hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400 disabled:bg-gray-50"
                                    >
                                        Selesai
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile View - Card Layout */}
            <div className="md:hidden space-y-3">
                {dashboardData?.length === 0 && (
                    <div className="p-8 text-center bg-gray-50 rounded-lg">
                        <p className="text-gray-500">Belum ada pesanan</p>
                    </div>
                )}
                {dashboardData?.map((order) => (
                    <div key={order?.order_id} className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
                        {/* Header Card */}
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                                {order?.foto_buyer ? (
                                    <img
                                        src={order.foto_buyer}
                                        alt={order.nama_buyer}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                                        <FaUser />
                                    </div>
                                )}
                                <div>
                                    <p className="text-xs text-gray-500">Nama Pemesan</p>
                                    <p className="font-medium text-sm">{order?.nama_buyer}</p>
                                </div>
                            </div>
                            <div className={`px-2 py-1 rounded text-xs font-medium ${order?.status === 'selesai' || order?.status === 'completed' ? 'bg-green-100 text-green-700' :
                                (order?.status === 'proses' || order?.status === 'in_progress') ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-gray-100 text-gray-700'
                                }`}>
                                {order?.status === 'in_progress' ? 'Proses' : (order?.status === 'completed' ? 'Selesai' : order?.status)}
                            </div>
                        </div>

                        {/* Content Card */}
                        <div className="space-y-2 border-t border-gray-200 pt-3">
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">Alamat:</span>
                                <span className="text-sm text-gray-800 text-right whitespace-normal break-words max-w-[60%]">{order?.alamat}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">Jasa:</span>
                                <span className="text-sm font-medium text-gray-800">{order?.nama_jasa}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">Tanggal:</span>
                                <span className="text-sm text-gray-800">{order?.tanggal || 'Placeholder'}</span>
                            </div>
                        </div>

                        {/* Action Buttons Mobile */}
                        <div className="mt-3 pt-3 border-t border-gray-200 flex gap-2">
                            <button
                                onClick={() => handleHubungiPembeli(order?.id_buyer)}
                                className="cursor-pointer flex-1 py-2 rounded-lg bg-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-300 transition-colors"
                            >
                                Hubungi Pembeli
                            </button>
                            <button
                                onClick={() => handleOrderanSelesai(order?.order_id)}
                                disabled={order?.status === 'completed' || order?.status === 'selesai'}
                                className="cursor-pointer flex-1 py-2 rounded-lg border border-primary text-primary bg-white text-sm font-medium hover:bg-primary/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
                            >
                                Orderan Selesai
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {/* Modal Confirmation */}
            <Modal isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)} width="max-w-md">
                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Konfirmasi Pesanan Selesai</h3>
                    <p className="text-gray-600 mb-6">
                        Apakah Anda yakin ingin menandai pesanan ini sebagai selesai?
                        Pastikan Anda telah menyelesaikan semua layanan yang diminta.
                    </p>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setShowConfirmModal(false)}
                            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                            disabled={updateStatus === 'loading'}
                        >
                            Batal
                        </button>
                        <button
                            onClick={confirmFinishOrder}
                            className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors flex items-center gap-2"
                            disabled={updateStatus === 'loading'}
                        >
                            {updateStatus === 'loading' ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Memproses...
                                </>
                            ) : (
                                'Ya, Selesai'
                            )}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default TableAllOrder