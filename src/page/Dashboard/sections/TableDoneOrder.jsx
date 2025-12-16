import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser } from '../../../features/authSlice'
import { getOrderBySellerId, selectOrderSeller, selectOrderSellerStatus, selectOrderSellerMessage, selectSellerServices } from '../../../features/sellerSlice'
import { selectAllService } from '../../../features/serviceSlice'
import { useNavigate } from 'react-router-dom'
import { selectUpdateOrderError, selectUpdateOrderStatus, updateOrderStatus, clearOrderStatus } from '../../../features/orderSlice'
import { FaUser } from "react-icons/fa";

const TableDoneOrder = () => {
    const user = useSelector(selectCurrentUser)
    const dispatch = useDispatch()
    const orders = useSelector(selectOrderSeller)
    const ordersStatus = useSelector(selectOrderSellerStatus)
    const ordersMessage = useSelector(selectOrderSellerMessage)
    const allService = useSelector(selectSellerServices)
    const navigate = useNavigate()
    const updateStatus = useSelector(selectUpdateOrderStatus)
    const updateError = useSelector(selectUpdateOrderError)

    // Refresh orders when updateStatus is success
    useEffect(() => {
        if (updateStatus === 'success' && user?.id_seller) {
            dispatch(getOrderBySellerId(user?.id_seller));
            dispatch(clearOrderStatus()); // Clear status after refresh
        }
    }, [updateStatus, user?.id_seller, dispatch]);

    useEffect(() => {
        if (user && user?.id_seller) {
            if (ordersStatus === 'idle') {
                dispatch(getOrderBySellerId(user?.id_seller));
            }
        }
    }, [dispatch, ordersStatus, user]);

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
    if (orders && allService) {
        const serviceMap = new Map(
            allService?.data?.map(service => [service?.id, service])
        );

        dashboardData = orders?.data?.map((order) => {
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

    const dashboardDataFilterDone = dashboardData?.filter((data) => data?.status === 'completed')

    const handleHubungiPembeli = (orderId) => {
        console?.log('Hubungi pembeli untuk order:', orderId)
        navigate('/dashboard/chat/' + orderId)
    }

    const handleOrderanSelesai = (orderId) => {
        console?.log('Menandai orderan selesai:', orderId)
        dispatch(updateOrderStatus({
            orderId: orderId,
            status: 'completed'
        }))
    }


    return (
        // Desktop View - Hidden on mobile
        <div className="w-full sm:mb-0 mb-20">
            <div className="hidden md:block">
                {/* Global Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-primary text-white font-bold rounded-t-lg items-center">
                    <div className="col-span-5">Produk & Alamat</div>
                    <div className="col-span-2">Tanggal</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-3 text-right">Aksi</div>
                </div>

                <div className="space-y-4 mt-2">
                    {dashboardDataFilterDone?.length === 0 && (
                        <div className="p-8 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5?.586a1 1 0 01?.707?.293l5?.414 5?.414a1 1 0 01?.293?.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Belum Ada Pesanan</h3>
                            <p className="text-sm text-gray-500 max-w-md mx-auto">Pesanan yang telah selesai akan muncul di sini. Mulai terima pesanan pertama Anda!</p>
                        </div>
                    )}

                    {dashboardDataFilterDone?.map((order) => (
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
                {dashboardDataFilterDone?.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-gray-500">Belum ada pesanan.</p>
                    </div>
                )}
                {dashboardDataFilterDone?.map((order) => (
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
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">Status:</span>
                                <span className={`text-sm font-medium px-2 py-1 rounded ${order?.status === 'selesai' || order?.status === 'completed' ? 'bg-green-100 text-green-700' :
                                    (order?.status === 'proses' || order?.status === 'in_progress') ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-gray-100 text-gray-700'
                                    }`}>
                                    {order?.status === 'in_progress' ? 'Proses' : (order?.status === 'completed' ? 'Selesai' : order?.status)}
                                </span>
                            </div>

                            {/* Action Buttons (Mobile) */}
                            <div className="flex flex-col gap-2 mt-4">
                                <button
                                    onClick={() => handleHubungiPembeli(order?.id_buyer)}
                                    className="cursor-pointer w-full py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200 transition-colors"
                                >
                                    Hubungi Pembeli
                                </button>
                                <button
                                    onClick={() => handleOrderanSelesai(order?.order_id)}
                                    disabled={order?.status === 'completed' || order?.status === 'selesai'}
                                    className="cursor-pointer w-full py-2 rounded-lg border border-primary text-primary bg-white text-sm font-medium hover:bg-primary hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
                                >
                                    Orderan Selesai
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TableDoneOrder