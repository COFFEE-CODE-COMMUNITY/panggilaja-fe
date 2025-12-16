import React, { useState, useEffect } from "react";
import Button from "../../components/common/Button";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/authSlice";
import {
    getOrders,
    selectOrders,
    selectOrdersError,
    selectOrdersStatus,
} from "../../features/userSlice";
import {
    createNewReview,
    selectCreateStatus,
    clearCreateStatus
} from "../../features/reviewSlice";
import { selectAllService } from "../../features/serviceSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import ModalReview from "../../components/modules/Modal/ModalReview";
import socket from "../../config/socket";

const OrderPage = () => {
    const [activeTab, setActiveTab] = useState("semua");
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(selectCurrentUser);
    const order = useSelector(selectOrders);
    const orderStatus = useSelector(selectOrdersStatus);
    const createReviewStatus = useSelector(selectCreateStatus);
    const orderMessage = useSelector(selectOrdersError);
    const allService = useSelector(selectAllService);
    console.log(order)
    useEffect(() => {
        if (user && user.id_buyer) {
            dispatch(getOrders(user.id_buyer));
        }
    }, [dispatch, user]);

    // Listen for real-time order status updates
    useEffect(() => {
        if (!user?.id_buyer) return;

        const handleOrderStatusUpdate = (data) => {
            console.log("🔔 Order status updated (Socket):", data);
            if (data?.status) {
                // Dispatch getOrders to refresh list
                dispatch(getOrders(user.id_buyer));
            }
        };

        socket.on("order_status_updated", handleOrderStatusUpdate);

        return () => {
            socket.off("order_status_updated", handleOrderStatusUpdate);
        };
    }, [user?.id_buyer, dispatch]);

    let orderService = [];

    if (orderStatus === "success" && order) {
        orderService = order.map((itemOrder) => {
            const sellerData = itemOrder.seller || {};
            const serviceData = itemOrder.service || {};

            return {
                order_id: itemOrder.id,
                status: itemOrder.status,
                tanggal: itemOrder.created_at,
                total_harga: itemOrder.total_harga,
                pesan_tambahan: itemOrder.pesan_tambahan,

                seller_id: sellerData.id || "",
                seller_id: sellerData.id || "",
                seller_name: sellerData.nama_toko || "",
                seller_image: sellerData.foto_toko || sellerData.foto_profile || "",

                service_id: serviceData.id || "",
                service_name: serviceData.nama_jasa || "",
                service_image: serviceData.foto_product || "",
                is_reviewed: itemOrder.is_reviewed || false,
            };
        });
    }

    const filteredOrders = orderService.filter((item) => {
        if (activeTab === "semua") return true;
        if (activeTab === "proses") return item.status === "in_progress" || item.status === "pending";
        if (activeTab === "selesai") return item.status === "completed";
        return true;
    });

    const formatHarga = (num) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(num);

    const translateStatus = (status) => {
        switch (status) {
            case "pending": return "Menunggu";
            case "in_progress": return "Proses";
            case "completed": return "Selesai";
            default: return status;
        }
    };

    const handleOpenReview = (item) => {
        setSelectedOrder(item);
        setIsReviewModalOpen(true);
    };

    const handleCloseReview = () => {
        setIsReviewModalOpen(false);
        setSelectedOrder(null);
        dispatch(clearCreateStatus());
    };

    const handleSubmitReview = async (reviewData) => {
        if (!selectedOrder) return;

        const result = await dispatch(createNewReview({
            reviewData: {
                rating: reviewData.rating,
                komentar: reviewData.comment,
            },
            orderId: selectedOrder.order_id
        }));

        if (createNewReview.fulfilled.match(result)) {
            handleCloseReview();
            // Refresh orders to update "is_reviewed" status
            dispatch(getOrders(user.id_buyer));
        }
    };

    return (
        <div className='w-full animate-fade-in'>
            {/* header */}
            <div className='flex items-center gap-4 mb-8'>
                <button
                    onClick={() => navigate('/setting')}
                    className='md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors'
                >
                    <FaArrowLeft className='text-gray-600' />
                </button>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900'>Pesanan Saya</h1>
                    <p className='text-gray-500 text-sm mt-1'>Riwayat pesanan jasa anda</p>
                </div>
            </div>

            {/* list container */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-50 overflow-hidden min-h-[400px]'>
                <div className='p-6 sm:p-8'>

                    {/* filter tab */}
                    <div className="border-b border-gray-200 mb-6">
                        <div className="flex gap-8">
                            {["semua", "proses", "selesai"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`py-4 font-medium capitalize text-sm transition-all relative ${activeTab === tab
                                        ? "text-primary font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-primary after:rounded-t-full"
                                        : "text-gray-500 hover:text-gray-700 cursor-pointer"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* order card */}
                    <div className="space-y-4">
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((item) => (
                                <div
                                    key={item.order_id}
                                    className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 transition-all hover:border-primary/50"
                                >
                                    {/* header */}
                                    <div className="flex justify-between items-start mb-4">
                                        <Link to={`/profile-service/${item.seller_id}`} className="flex items-center gap-3 group/seller">
                                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600 overflow-hidden border border-gray-200 group-hover/seller:border-primary transition-colors">
                                                {item.seller_image ? (
                                                    <img
                                                        src={item.seller_image}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    item.seller_name.charAt(0)
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900 group-hover/seller:text-primary transition-colors">{item.seller_name}</p>
                                                <p className="text-xs text-gray-500">{new Date(item.tanggal).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                            </div>
                                        </Link>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${item.status === "completed"
                                                ? "bg-green-50 text-green-700"
                                                : item.status === "in_progress"
                                                    ? "bg-blue-50 text-blue-700"
                                                    : "bg-yellow-50 text-yellow-700"
                                                }`}
                                        >
                                            {translateStatus(item.status)}
                                        </span>
                                    </div>

                                    <hr className="border-gray-100 mb-4" />

                                    {/* content */}
                                    <div className="flex gap-4">
                                        <Link to={`/service/${item.service_id}`} className="shrink-0">
                                            <img
                                                src={item.service_image}
                                                className="w-24 h-24 rounded-lg object-cover border border-gray-100 hover:border-primary transition-colors"
                                            />
                                        </Link>

                                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                                            <div>
                                                <Link to={`/service/${item.service_id}`} className="block">
                                                    <h3 className="font-bold text-gray-900 mb-1 truncate text-lg hover:text-primary transition-colors">{item.service_name}</h3>
                                                </Link>
                                                <p className="text-sm text-gray-500 line-clamp-2">
                                                    {item.pesan_tambahan || "Tidak ada catatan tambahan"}
                                                </p>
                                            </div>
                                            <div className="mt-2">
                                                <p className="text-xs text-gray-500">Total Harga</p>
                                                <p className="text-base font-bold text-primary">{formatHarga(item.total_harga)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* button*/}
                                    <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-50">
                                        <Button
                                            variant={item.status === "completed" && !item.is_reviewed ? "secondary" : "secondary"}
                                            className={`px-6 py-2 text-sm rounded-lg font-medium ${item.status === "completed" && !item.is_reviewed
                                                ? "bg-secondary text-white hover:bg-secondary/90"
                                                : "bg-transparent text-gray-300 border border-gray-200 cursor-not-allowed"
                                                }`}
                                            disabled={item.status !== "completed" || item.is_reviewed}
                                            onClick={() => item.status === "completed" && !item.is_reviewed && handleOpenReview(item)}
                                            to={undefined}
                                        >
                                            {item.is_reviewed ? "Sudah Diulas" : "Beri Ulasan"}
                                        </Button>

                                        <Button
                                            variant="primary"
                                            className="px-6 py-2 text-sm rounded-lg font-medium text-white shadow-sm hover:shadow hover:bg-primary/90"
                                            to={`/chat/${item.seller_id}`}
                                        >
                                            Hubungi Sekarang
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Belum ada pesanan</h3>
                                <p className="text-gray-500 mb-8 text-center max-w-md">
                                    Sepertinya kamu belum pernah memesan jasa apapun. Yuk cari jasa yang kamu butuhkan sekarang!
                                </p>
                                <Link
                                    to="/search-result"
                                    className="px-8 py-3 bg-primary text-white font-semibold rounded-2xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                >
                                    Cari Jasa
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ModalReview
                isOpen={isReviewModalOpen}
                onClose={handleCloseReview}
                onSubmit={handleSubmitReview}
                isLoading={createReviewStatus === 'loading'}
                order={selectedOrder}
            />
        </div>
    );
};

export default OrderPage;
