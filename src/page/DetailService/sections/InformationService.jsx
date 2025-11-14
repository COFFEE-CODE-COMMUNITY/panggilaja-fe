import { useEffect, useState } from "react";
import { FaStar, FaRegHeart, FaHeart } from "react-icons/fa";
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

  // 🆕 Get buyer ID
  const myId = user?.id_buyer;
  const isBuyer = user?.active_role?.toUpperCase() === "BUYER";

  useEffect(() => {
    if (idSeller) {
      dispatch(getSellerById(idSeller));
    }
  }, [idSeller]);

  useEffect(() => {
    if (idProvider && token) {
      dispatch(getReviewServicesById(idProvider));
    }
  }, [dispatch, idProvider]);

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
    <div className="h-full lg:w-[40%] w-full flex flex-col gap-[30px] lg:py-7 md:py-6 py-5 px-[15px]">
      <div className="flex flex-col gap-[10px]">
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-col leading-8">
            <div className="flex">
              <Link
                className="flex-1 text-h5 font-light"
                to={`/profile-service/${idSeller}`}
              >
                {sellerProfile?.nama_toko}
              </Link>
              {token &&
                (isServiceFavorite ? (
                  <Button
                    onClick={() =>
                      dispatch(deleteFavoriteService(isServiceFavorite.id))
                    }
                  >
                    <FaHeart className={`text-gray-700 text-xl`} />
                  </Button>
                ) : (
                  <Button onClick={token ? handleAddFavorite : ""}>
                    <FaRegHeart className={`text-gray-700 text-xl`} />
                  </Button>
                ))}
            </div>
            <h2 className="text-h2">{nameService}</h2>
          </div>
          <div className="flex items-center gap-[5px]">
            <div className="flex gap-[5px]">
              <Stars many={4} variant="star" />
            </div>
            <p className="text-h5 font-light">{totalReview} ulasan</p>
          </div>
          <h2 className="text-h3">
            Rp. {basePrice} - {topPrice}
          </h2>
          <p className="text-h5 font-light">
            {!showMoreDesc && description.slice(0, 200)}
            {!showMoreDesc && (
              <>
                <span>...</span>
                <span
                  onClick={() => setShowMoreDesc(!showMoreDesc)}
                  className="font-medium cursor-pointer"
                >
                  selengkapnya
                </span>
              </>
            )}
            {showMoreDesc && description}
          </p>
        </div>
        <div className="flex flex-1">
          <div className="w-full flex gap-1.5">
            <Button
              variant="primary"
              className="flex-2 rounded-lg text-white font-medium h-[50px] flex items-center justify-center w-full"
              onClick={handleStartChat}
              disabled={isStartingChat}
            >
              {isStartingChat ? "Memuat..." : "Hubungi sekarang"}
            </Button>

            <Button
              variant="secondary"
              className="flex-1 rounded-lg text-white font-medium h-[50px] flex items-center justify-center w-[150px] px-[10px]"
              to={`/service/nego/${idService}`}
            >
              {isStartingChat ? "Memuat..." : "Negoin aja"}
            </Button>
          </div>
        </div>
      </div>
      <ReviewService />
    </div>
  );
};

export default InformationService;
