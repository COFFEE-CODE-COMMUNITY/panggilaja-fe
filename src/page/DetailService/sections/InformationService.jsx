import { useEffect, useState } from "react";
import { FaStar, FaRegHeart, FaHeart, FaCommentDots, FaHandshake } from "react-icons/fa";
import Button from "../../../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../../config/socket";
import {
  addFavoriteService,
  deleteFavoriteService,
  getFavoriteService,
  getReviewServicesById,
  resetAddFavoritesStatus,
  resetDeleteFavoritesStatus,
  selectAddFavoriteServiceError,
  selectAddFavoriteServiceStatus,
  selectDeleteFavoriteServiceError,
  selectDeleteFavoriteServiceStatus,
  selectFavoriteService,
  selectReviewService,
  selectReviewServiceStatus,
} from "../../../features/serviceSlice";
import {
  selectAccessToken,
  selectCurrentUser,
} from "../../../features/authSlice";
import {
  getSellerById,
  selectSelectedSeller,
} from "../../../features/sellerSlice";
import Stars from "../../../components/common/Stars";
import ReviewService from "./ReviewService";

const InformationService = ({
  sellerName,
  idProvider,
  idService,
  nameService,
  totalReview,
  topPrice,
  basePrice,
  description,
  totalReviewSeller,
  foto_product,
  idSeller,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const favorites = useSelector(selectFavoriteService);
  const [isStartingChat, setIsStartingChat] = useState(false);
  const reviews = useSelector(selectReviewService);
  const status = useSelector(selectReviewServiceStatus);
  const statusFavorite = useSelector(selectAddFavoriteServiceStatus);
  const messageFavorite = useSelector(selectAddFavoriteServiceError);
  const statusAdd = useSelector(selectAddFavoriteServiceStatus);
  const errorAdd = useSelector(selectAddFavoriteServiceError);
  const token = useSelector(selectAccessToken);
  const sellerProfile = useSelector(selectSelectedSeller);

  const [showMoreDesc, setShowMoreDesc] = useState(false);
  console.log(user)
  const myId = user?.id_buyer;
  const isBuyer = user?.active_role?.toUpperCase() === "BUYER";

  useEffect(() => {
    if (idSeller) {
      dispatch(getSellerById(idSeller));
    }
  }, [idSeller]);



  const handleAddFavorite = () => {
    dispatch(addFavoriteService(idService));
  };

  useEffect(() => {
    if (statusAdd === "success") {
      if (user?.id) {
        dispatch(getFavoriteService(user.id));
      }
      dispatch(resetAddFavoritesStatus());
    }
  }, [statusAdd, errorAdd, dispatch, user?.id]);

  let isServiceFavorite = favorites?.data?.find(
    (favorite) => favorite.service_id === idService
  );

  const deleteFavoriteStatus = useSelector(selectDeleteFavoriteServiceStatus);
  const deleteFavoriteMessage = useSelector(selectDeleteFavoriteServiceError);

  useEffect(() => {
    if (deleteFavoriteStatus === "success") {
      if (user?.id) {
        dispatch(getFavoriteService(user.id));
      }
      dispatch(resetDeleteFavoritesStatus());
    }
  }, [deleteFavoriteStatus, deleteFavoriteMessage, dispatch, user?.id]);

  const handleStartChat = () => {
    if (isStartingChat || !idProvider || !nameService || !myId) {
      console.error("Missing required data:", {
        idProvider,
        nameService,
        myId,
      });
      return;
    }

    setIsStartingChat(true);

    const imageUrl =
      foto_product ||
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400";
    const shortDescription = description.substring(0, 50) + "...";

    // Format pesan otomatis
    const autoMessage = `Halo, saya tertarik dengan layanan "${nameService}". (ServiceID: ${idService}) (Harga: Rp ${basePrice.toLocaleString(
      "id-ID"
    )}) (Deskripsi: ${shortDescription}) (Gambar: ${imageUrl})`;

    // Data untuk socket
    const messageData = {
      id_buyer: myId,
      id_seller: idProvider,
      text: autoMessage,
      sender_role: "BUYER",
    };

    console.log("📤 Emitting message via socket:", messageData);

    // 🔥 KIRIM VIA SOCKET (BUKAN HTTP!)
    socket.emit("send_message", messageData);

    // Navigate ke chat dengan delay kecil
    setTimeout(() => {
      setIsStartingChat(false);
      navigate(`/chat/${idProvider}`, {
        state: { shouldRefreshList: true },
      });
    }, 300); // 300ms delay untuk memastikan socket terkirim
  };

  // 🆕 Listener untuk konfirmasi pesan terkirim (optional)
  useEffect(() => {
    const handleMessageReceived = (msg) => {
      console.log("✅ Message confirmed:", msg);
    };

    socket.on("receive_message", handleMessageReceived);

    return () => {
      socket.off("receive_message", handleMessageReceived);
    };
  }, []);

  return (
    <div className="h-full flex-1 w-full flex flex-col gap-6 lg:py-0 py-6">
      <div className="flex flex-col gap-6">
        {/* header */}
        <div className="space-y-4">
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-1">
              <Link
                to={`/profile-service/${idSeller}`}
                className="text-sm font-medium text-primary flex items-center gap-2"
              >
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs">
                  {sellerProfile?.nama_toko?.charAt(0) || 'S'}
                </div>
                {sellerProfile?.nama_toko}
              </Link>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                {nameService}
              </h1>
            </div>

            {token && (
              <button
                onClick={isServiceFavorite ? () => dispatch(deleteFavoriteService(isServiceFavorite.id)) : handleAddFavorite}
                className="cursor-pointer p-2 rounded-full hover:bg-gray-50 transition-colors"
              >
                {isServiceFavorite ? (
                  <FaHeart className="text-red-500 text-xl" />
                ) : (
                  <FaRegHeart className="text-gray-400 text-xl" />
                )}
              </button>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <FaStar className="text-yellow-400" />
              <span className="font-medium text-gray-900">{totalReview || 0}</span>
              <span>({totalReview || 0} ulasan)</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <div>{totalReviewSeller || 0} Pesanan selesai</div>
          </div>
        </div>

        <div className="h-px bg-gray-100"></div>

        {/* harga selction */}
        <div>
          <p className="text-sm text-gray-500 mb-1">Mulai dari</p>
          <h2 className="text-3xl font-bold text-primary">
            Rp {parseInt(basePrice).toLocaleString('id-ID')}
            {topPrice && topPrice > basePrice && (
              <span className="text-lg text-gray-400 font-normal ml-2">
                - Rp {parseInt(topPrice).toLocaleString('id-ID')}
              </span>
            )}
          </h2>
        </div>

        {/* deskripsi selection */}
        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Deskripsi Layanan</h3>
          <div className={`text-gray-600 text-sm leading-relaxed ${!showMoreDesc ? 'line-clamp-4' : ''}`}>
            {description}
          </div>
          {description.length > 200 && (
            <button
              onClick={() => setShowMoreDesc(!showMoreDesc)}
              className="text-primary text-sm font-medium mt-2 hover:underline"
            >
              {showMoreDesc ? "Sembunyikan" : "Baca selengkapnya"}
            </button>
          )}
        </div>

        {/* button */}
        <div className="flex gap-3 mt-2">
          <Button
            variant="primary"
            className="flex-2 gap-3 rounded-lg text-white font-medium h-[50px] hover:bg-primary/90 flex items-center justify-center w-full"
            onClick={handleStartChat}
            disabled={isStartingChat}
          >
            <FaCommentDots />
            Hubungi sekarang
          </Button>

          <Button
            variant="secondary"
            className="flex-1 gap-3 rounded-lg text-white font-medium h-[50px] hover:bg-secondary/90 flex items-center justify-center w-[150px] px-[10px]"
            to={`/service/nego/${idService}`}
          >
            <FaHandshake />
            Negoin aja
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InformationService;
