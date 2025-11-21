import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ImageService from "./sections/ImageService";
import {
  getReviewServicesById,
  getServicesById,
  selectReviewService,
  selectReviewServiceStatus,
  selectSelectedService,
  selectSelectedServiceStatus,
} from "../../features/serviceSlice";
import { useEffect } from "react";
import InformationService from "./sections/InformationService";
import ReviewService from "./sections/ReviewService";

const DetailService = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const service = useSelector(selectSelectedService);
  const status = useSelector(selectSelectedServiceStatus);
  
  const reviews = useSelector(selectReviewService);
  const reviewStatus = useSelector(selectReviewServiceStatus);

  useEffect(() => {
    if (id) {
      dispatch(getServicesById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    console.log("Service loaded:", service);
    if (service?.id) {
      console.log("Dispatching getReviewServicesById with ID:", service.id);
      dispatch(getReviewServicesById(service.id));
    } else {
      console.log("Service ID not available yet");
    }
  }, [dispatch, service?.id]);

  console.log("Current reviews state:", { reviews, reviewStatus });

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="mt-20 lg:flex h-full w-full lg:gap-[30px] md:gap-[20px] gap-[10px] mb-[50px] sm:pt-[20px] xl:px-[150px] lg:px-[70px] md:px-[55px] sm:px-[35px] mx-auto transition-all duration-150">
      {status === "loading" && <div className="w-full h-screen">loading</div>}
      {status === "success" && (
        <>
          <div className="flex flex-col lg:w-[60%] gap-10">
            <ImageService image={service.foto_product} />
            <ReviewService reviews={reviews?.data || []} className={'lg:block hidden'}/>
          </div>
          <InformationService
            description={service.deskripsi}
            idProvider={service.seller_id}
            idService={service.id}
            nameService={service.nama_jasa}
            totalReviewSeller={service.jumlah_rating}
            totalReview={service.jumlah_rating}
            basePrice={service.base_price}
            topPrice={service.top_price}
            idSeller={service.seller_id}
            foto_product={service.foto_product}
          />
          <ReviewService reviews={reviews?.data || []} className={'lg:hidden block'}/>
        </>
      )}
    </div>
  );
};

export default DetailService;
