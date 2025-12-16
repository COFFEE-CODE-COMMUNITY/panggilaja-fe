import React, { useEffect } from "react";
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

  const [isArtificialLoading, setIsArtificialLoading] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsArtificialLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const DetailServiceSkeleton = () => (
    <div className="bg-gray-50/60 min-h-screen w-full pt-28 pb-12 animate-pulse">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-2xl p-6">
        <div className="lg:flex lg:gap-8 items-start">
          {/* Left Column Skeleton */}
          <div className="flex flex-col gap-6 shrink-0 w-full lg:w-[400px]">
            <div className="bg-gray-200 rounded-xl aspect-[4/3] w-full" />
            <div className="hidden lg:block space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/3" />
              <div className="h-24 bg-gray-200 rounded w-full" />
              <div className="h-24 bg-gray-200 rounded w-full" />
            </div>
          </div>

          {/* Right Column Skeleton */}
          <div className="flex-1 mt-6 lg:mt-0 w-full min-w-0 space-y-6">
            <div className="h-10 bg-gray-200 rounded w-3/4" />
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-full bg-gray-200" />
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-3 bg-gray-200 rounded w-1/6" />
              </div>
            </div>
            <div className="h-32 bg-gray-200 rounded w-full" />

            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-12 bg-gray-200 rounded" />
              <div className="h-12 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (status === "loading" || isArtificialLoading) {
    return <DetailServiceSkeleton />;
  }

  return (
    <div className="bg-gray-50/60 min-h-screen w-full pt-28 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-2xl">
        {status === "loading" && <div className="w-full h-screen">loading</div>}
        {status === "success" && (
          <div className="lg:flex lg:gap-8 items-start">
            {/* Left Column */}
            <div className="flex flex-col lg:w-auto gap-6 shrink-0">
              <div className="bg-white p-4">
                <ImageService image={service.foto_product} />
              </div>
              <div className="bg-white p-6 hidden lg:block max-w-[42rem]">
                <ReviewService reviews={reviews?.data || []} className="" />
              </div>
            </div>

            {/* Right Column */}
            <div className="flex-1 mt-6 lg:mt-0 w-full min-w-0">
              <div className="bg-white p-6 md:p-8 sticky top-28">
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
              </div>
            </div>

            {/* Mobile Reviews */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mt-6 lg:hidden block">
              <ReviewService reviews={reviews?.data || []} className="" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailService;
