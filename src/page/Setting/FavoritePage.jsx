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

    useEffect(() => {
        if (user?.id) {
            dispatch(getFavoriteService(user.id))
        }
    }, [dispatch, user?.id, deleteStatus])

    let favoritesService = [];

    if (favoritesStatus === "success" && favorites.data && services.length > 0) {
        const favoritedServiceIds = favorites.data.map((fav) => fav.service_id);
        favoritesService = services.filter((service) =>
            favoritedServiceIds.includes(service.id)
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

        // Data untuk socket
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
            <div className='bg-white rounded-xl shadow-sm border border-gray-50 overflow-hidden min-h-[400px]'>
                <div className='p-6 sm:p-8'>
                    {favoritesService.length > 0 ? (
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
                                        <div className="flex gap-6">
                                            {/* Image */}
                                            <div className="w-48 md:w-56 aspect-video sm:aspect-[4/3] flex-shrink-0">
                                                <img
                                                    src={favorite?.foto_product}
                                                    alt={favorite.nama_jasa}
                                                    className="w-50 h-50 object-cover rounded-lg"
                                                />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 flex flex-col justify-between min-w-0 gap-4">
                                                <div>
                                                    <div className="flex justify-between items-start gap-4">
                                                        <div>
                                                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                                                                <FaStore className="text-primary" />
                                                                <span>{favorite.seller_name || "Nama Toko"}</span>
                                                            </div>
                                                            <Link
                                                                to={`/service/${favorite.id}`}
                                                                className="text-xl font-bold text-gray-900 hover:text-primary transition-colors line-clamp-1"
                                                            >
                                                                {favorite.nama_jasa}
                                                            </Link>
                                                        </div>
                                                        <button
                                                            onClick={() => dispatch(deleteFavoriteService(idDelFav.id))}
                                                            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors flex-shrink-0"
                                                            title="Hapus dari favorit"
                                                        >
                                                            <FaHeart size={20} />
                                                        </button>
                                                    </div>

                                                    <p className="text-primary font-bold text-lg mt-1">
                                                        {new Intl.NumberFormat("id-ID", {
                                                            style: "currency",
                                                            currency: "IDR",
                                                            minimumFractionDigits: 0,
                                                        }).format(favorite.base_price)}
                                                    </p>

                                                    <p className="text-gray-600 text-sm mt-3 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                                                        {favorite.deskripsi}
                                                    </p>
                                                </div>

                                                {/* Actions */}
                                                <div className="sm:block hidden flex flex-wrap gap-3 mt-2 pt-4 border-t border-gray-100">
                                                    <Button
                                                        variant="primary"
                                                        className="flex-1 sm:flex-none px-6 py-2 text-sm rounded-lg flex items-center justify-center gap-2 text-white"
                                                        onClick={() => handleStartChat(favorite)}
                                                        disabled={isStartingChat}
                                                    >
                                                        <FaCommentDots />
                                                        Hubungi Sekarang
                                                    </Button>
                                                    <Button
                                                        variant="secondary"
                                                        className="flex-1 sm:flex-none px-6 py-2 text-sm rounded-lg flex items-center justify-center gap-2 text-white"
                                                        to={`/service/nego/${favorite.id}`}
                                                    >
                                                        <FaHandshake />
                                                        Negoin Aja
                                                    </Button>
                                                </div>
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
        </div>
    )
}

export default FavoritePage
