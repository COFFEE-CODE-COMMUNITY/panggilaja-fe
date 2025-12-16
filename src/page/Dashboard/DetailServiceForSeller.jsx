import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    getReviewServicesById,
    getServicesById,
    selectReviewService,
    selectReviewServiceStatus,
    selectSelectedService,
    selectSelectedServiceStatus,
} from "../../features/serviceSlice";
import { useEffect } from "react";
import InformationServiceForSeller from "../DetailService/sections/InformationServiceForSeller";
import ReviewService from "../DetailService/sections/ReviewService";
import ImageService from "../DetailService/sections/ImageService";
import socket from "../../config/socket";

const DetailServiceForSeller = () => {
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

    // Listen for real-time review updates
    useEffect(() => {
        if (!service?.id) return;

        const handleReviewAdded = (data) => {
            console.log("🔔 Review added (Socket):", data);
            // Check if the review corresponds to the current service
            if (String(data.serviceId) === String(service.id)) {
                console.log("Refetching reviews and service details...");
                dispatch(getReviewServicesById(service.id));
                dispatch(getServicesById(id)); // Also refresh service details for rating update
            }
        };

        socket.on("review_added", handleReviewAdded);

        return () => {
            socket.off("review_added", handleReviewAdded);
        };
    }, [service?.id, id, dispatch]);

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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-24 mb-12 lg:flex lg:gap-12 min-h-[calc(100vh-100px)] py-3">
            {status === "loading" && <div className="w-full h-screen">loading</div>}
            {status === "success" && (
                <>
                    <div className="flex flex-col lg:w-auto gap-6">
                        <ImageService image={service.foto_product} />
                        <ReviewService reviews={reviews?.data || []} className={'lg:block hidden'} />
                    </div>
                    <InformationServiceForSeller
                        description={service.deskripsi}
                        idProvider={service.seller_id}
                        idService={service.id}
                        nameService={service.nama_jasa}
                        totalReviewSeller={service.jumlah_pembeli}
                        totalReview={service.jumlah_rating}
                        basePrice={service.base_price}
                        topPrice={service.top_price}
                        idSeller={service.seller_id}
                        foto_product={service.foto_product}
                        averageRating={service.rata_rata_rating}
                    />
                    <ReviewService reviews={reviews?.data || []} className={'lg:hidden block'} />
                </>
            )}
        </div>
    );
};

export default DetailServiceForSeller;
