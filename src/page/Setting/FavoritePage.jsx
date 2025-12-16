import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaHeart, FaRegHeart, FaStore, FaCommentDots, FaHandshake } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { selectCurrentUser } from '../../features/authSlice'
import {
    deleteFavoriteService,
    getFavoriteService,
    selectAllService,
    selectDeleteFavoriteServiceStatus,
    selectFavoriteService,
    selectFavoriteServiceStatus
} from '../../features/serviceSlice'
import socket from '../../config/socket'
import Button from '../../components/common/Button'

const FavoritePage = () => {
    const user = useSelector(selectCurrentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const favorites = useSelector(selectFavoriteService)
    const favoritesStatus = useSelector(selectFavoriteServiceStatus)
    const services = useSelector(selectAllService)
    const deleteStatus = useSelector(selectDeleteFavoriteServiceStatus)

    const [isStartingChat, setIsStartingChat] = useState(false)
    const [optimisticDeletedIds, setOptimisticDeletedIds] = useState([])

    useEffect(() => {
        if (user?.id) {
            dispatch(getFavoriteService(user.id))
        }
    }, [dispatch, user?.id, deleteStatus])



    let favoritesService = [];

    if (favoritesStatus === "success" && favorites.data && services.length > 0) {
        const favoritedServiceIds = favorites.data.map((fav) => fav.service_id);
        favoritesService = services.filter((service) =>
            favoritedServiceIds.includes(service.id) && !optimisticDeletedIds.includes(service.id)
        );
    }

    const handleStartChat = (service) => {
        const myId = user?.id_buyer;
        const idProvider = service.seller_id;

        if (isStartingChat || !idProvider || !service.nama_jasa || !myId) {
            return;
        }

        setIsStartingChat(true);

        const imageUrl = service.foto_product || "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400";
        const shortDescription = service.deskripsi.substring(0, 50) + "...";

        // Format pesan otomatis
        const autoMessage = `Halo, saya tertarik dengan layanan "${service.nama_jasa}". (ServiceID: ${service.id}) (Harga: Rp ${service.base_price.toLocaleString("id-ID")}) (Deskripsi: ${shortDescription}) (Gambar: ${imageUrl})`;

        // Data for socket
        const messageData = {
            id_buyer: myId,
            id_seller: idProvider,
            text: autoMessage,
            sender_role: "BUYER",
        };

        socket.emit("send_message", messageData);

        setTimeout(() => {
            setIsStartingChat(false);
            navigate(`/chat/${idProvider}`, {
                state: { shouldRefreshList: true },
            });
        }, 300);
    };

    const handleOptimisticDelete = (favoriteId, serviceId) => {
        setOptimisticDeletedIds((prev) => [...prev, serviceId]);
        dispatch(deleteFavoriteService(favoriteId));
    };

    const FavoriteSkeleton = () => (
        <div className="flex gap-4 animate-pulse">
            <div className="w-24 sm:w-32 md:w-48 aspect-[3/4] sm:aspect-[4/3] bg-gray-200 rounded-lg flex-shrink-0" />
            <div className="flex-1 flex flex-col min-w-0">
                <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0 space-y-2">
                        <div className="h-5 bg-gray-200 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 rounded w-1/3" />
                    </div>
                    <div className="w-8 h-8 bg-gray-200 rounded-full" />
                </div>
                <div className="h-6 bg-gray-200 rounded w-1/4 mt-4" />
                <div className="h-4 bg-gray-200 rounded w-full mt-3" />
                <div className="h-4 bg-gray-200 rounded w-2/3 mt-2" />
            </div>
        </div>
    );

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
                    <h1 className='text-2xl font-bold text-gray-900'>Favorit Saya</h1>
                    <p className='text-gray-500 text-sm mt-1'>Daftar jasa yang anda simpan</p>
                </div>
            </div>

            {/* list container */}
            <div className='bg-white overflow-hidden min-h-[600px] rounded-xl shadow-sm border border-gray-100 p-4'>
                <div className=''>
                    {favoritesStatus === 'loading' ? (
                        <div className="flex flex-col gap-6">
                            {[1, 2, 3].map((i) => (
                                <FavoriteSkeleton key={i} />
                            ))}
                        </div>
                    ) : favoritesService.length > 0 ? (
                        <div className='flex flex-col gap-6'>
                            {favoritesService.map((favorite) => {
                                const idDelFav = favorites.data.find(
                                    (service) => service.service_id === favorite.id
                                );
                                return (
                                    <div
                                        key={favorite.id}
                                        className="bg-white rounded-xl p-4 hover:shadow-md transition-all duration-300 group"
                                    >
                                        <div className="flex gap-4">
                                            {/* Image */}
                                            <div className="w-24 sm:w-32 md:w-48 aspect-[3/4] sm:aspect-[4/3] flex-shrink-0">
                                                <img
                                                    src={favorite?.foto_product}
                                                    alt={favorite.nama_jasa}
                                                    className="w-full h-full object-cover rounded-lg shadow-sm"
                                                />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 flex flex-col min-w-0">
                                                <div className="flex justify-between items-start gap-2">
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-base sm:text-lg font-bold text-gray-900 line-clamp-2 mb-1">
                                                            <Link to={`/service/${favorite.id}`} className="hover:text-primary transition-colors">
                                                                {favorite.nama_jasa}
                                                            </Link>
                                                        </h3>
                                                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                                                            <FaStore className="text-primary" />
                                                            <span className="truncate">{favorite.seller_name || "Nama Toko"}</span>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => handleOptimisticDelete(idDelFav.id, favorite.id)}
                                                        className="p-1.5 sm:p-2 hover:text-gray-400 text-red-500 hover:bg-red-50 rounded-full transition-all flex-shrink-0 cursor-pointer"
                                                        title="Hapus dari favorit"
                                                    >
                                                        <FaHeart size={18} className="sm:w-5 sm:h-5" />
                                                    </button>
                                                </div>

                                                <p className="text-primary font-bold text-base sm:text-lg mb-1">
                                                    {new Intl.NumberFormat("id-ID", {
                                                        style: "currency",
                                                        currency: "IDR",
                                                        minimumFractionDigits: 0,
                                                    }).format(favorite.base_price)}
                                                </p>

                                                <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                                                    {favorite.deskripsi}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                            <div className="bg-gray-50 p-4 rounded-full mb-4">
                                <FaRegHeart className="text-4xl text-gray-300" />
                            </div>
                            <p className="text-lg font-medium text-gray-900">Belum ada favorit</p>
                            <p className="text-sm text-gray-500 mt-1">Simpan jasa yang anda suka disini</p>
                            <Link to="/search-result" className="mt-4 px-6 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-colors">
                                Cari Jasa
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}

export default FavoritePage
