import { useEffect, useState } from "react";
import { FaStar, FaRegHeart, FaHeart } from "react-icons/fa";
import Button from "../../../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import axiosInstance from "../../../components/utils/axios";
import { selectAccessToken, selectCurrentUser } from "../../../features/authSlice";
import Stars from "../../../components/common/Stars";
import { getSellerById, selectSelectedSeller } from "../../../features/sellerSlice";
import FaqService from "./FaqService";

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
  idSeller
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
  const seller = useSelector(selectSelectedSeller)
  const token = useSelector(selectAccessToken)
  const sellerProfile = useSelector(selectSelectedSeller)

  useEffect(() => {
    if(idSeller){
      dispatch(getSellerById(idSeller))
    }
  },[idSeller])

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

  const [showMoreDesc, setShowMoreDesc] = useState(false)

  const handleStartChat = async () => {
    if (isStartingChat || !idProvider || !nameService) return;

    setIsStartingChat(true);

    const API_BASE_URL = "http://localhost:5000/api";

    const imageUrl =
      foto_product ||
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400";
    const shortDescription = description.substring(0, 50) + "...";

    try {
      const autoMessage = `Halo, saya tertarik dengan layanan "${nameService}". (Harga: Rp ${basePrice.toLocaleString(
        "id-ID"
      )}) (Deskripsi: ${shortDescription}) (Gambar: ${imageUrl})`;

      const payload = {
        receiverId: idProvider,
        text: autoMessage,
      };

      const response = await axiosInstance.post(
        `${API_BASE_URL}/chat`,
        payload
      );

      if (response.data.status === "success") {
        navigate(`/chat/${idProvider}`, {
          state: { shouldRefreshList: true },
        });
      } else {
        throw new Error(response.data.message || "Gagal memulai chat");
      }
    } catch (error) {
      console.error(
        "Gagal memulai chat:",
        error.response?.data || error.message
      );
      alert("Gagal memulai percakapan. Silakan coba lagi.");
      setIsStartingChat(false);
    }
  };

  return (
    <div className="lg:h-full h-1/2 lg:w-[40%] w-full flex flex-col gap-[30px] lg:py-7 md:py-6 py-5 px-[15px]">
      <div className="flex flex-col gap-[10px]">
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-col leading-8">
            <div className='flex'>
              <Link 
                  className='flex-1 text-h5 font-light'
                  to={`/profile-service/${idSeller}`}
              >
                  {sellerProfile?.nama_toko}
              </Link>
              {token && (
                  isServiceFavorite ? (
                      <Button 
                          onClick={() => dispatch(deleteFavoriteService(isServiceFavorite.id))}
                      >
                          <FaHeart className={`text-gray-700 text-xl`}
                          />
                      </Button>
                  ) : (
                      <Button 
                          onClick={token ? handleAddFavorite : ''}
                      >
                          <FaRegHeart className={`text-gray-700 text-xl`}/>
                      </Button>
                  )
              )}
            </div>
            <h2 className="text-h2">{nameService}</h2>
          </div>
          <div className="flex items-center gap-[5px]">
            <div className="flex gap-[5px]">
              <Stars many={4} variant="star"/>
            </div>
            <p className="text-h5 font-light">{totalReview} ulasan</p>
          </div>
          <h2 className="text-h3">
            Rp. {basePrice} - {topPrice}
          </h2>
          <p className='text-h5 font-light'>
            {!showMoreDesc && description.slice(0,200)}{!showMoreDesc && <>
                <span>...</span><span onClick={() => setShowMoreDesc(!showMoreDesc)} className='font-medium cursor-pointer'>selengkapnya</span>
            </>}
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
              onClick={handleStartChat}
              disabled={isStartingChat}
            >
              {isStartingChat ? "Memuat..." : "Negoin aja"}
            </Button>
          </div>
        </div>
      </div>
      <FaqService/>
    </div>
  );
};

export default InformationService;
