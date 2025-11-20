import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCreateStatus,
  createNewReview,
  selectCreateError,
  selectCreateStatus,
} from "../../features/reviewSlice";
import { ServiceCard } from "./sections/ServiceCard";
import {
  getOrderById,
  selectCurrentOrder,
  selectOrderStatus,
} from "../../features/orderSlice";
import { ReviewHeader } from "./sections/ReviewHeader";
import { ReviewSuccess } from "./sections/ReviewSuccess";
import { RatingInput } from "./sections/RatingInput";
import { ReviewForm } from "./sections/ReviewForm";
import { StatusMessage } from "./sections/StatusMessage";

const ReviewPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderId } = useParams();

  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const createStatus = useSelector(selectCreateStatus);
  const createError = useSelector(selectCreateError);

  const orders = useSelector(selectCurrentOrder);
  const orderStatus = useSelector(selectOrderStatus);

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, [dispatch, orderId]);

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedRating === 0) {
      alert("Silakan pilih rating terlebih dahulu");
      return;
    }

    // Convert rating to float to match API requirements
    const reviewData = {
      komentar: reviewText,
      rating: parseFloat(selectedRating.toFixed(1)), // Convert to float with 1 decimal place
    };

    // Debug logging to see what we're sending
    console.log("Submitting review with data:", reviewData);
    console.log("For order ID:", orderId);

    dispatch(createNewReview({ reviewData, orderId })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        setIsSubmitted(true);
      } else if (result.meta.requestStatus === "rejected") {
        console.error("Review submission failed:", result.payload);

        // Check if it's an authentication error
        if (result.payload?.error_code === "NO_USER_CONTEXT") {
          // Redirect to login page
          navigate("/login");
        }
      }
      setTimeout(() => dispatch(clearCreateStatus()), 3000);
    });
  };

  const resetForm = () => {
    setSelectedRating(0);
    setReviewText("");
    setIsSubmitted(false);
  };

  if (orderStatus === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br py-8 sm:px-4 lg:mt-15 mt-10 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[var(--color-primary)] mx-auto mb-4" />
          <p className="text-gray-600">Memuat data jasa...</p>
        </div>
      </div>
    );
  }

  if (orderStatus === "failed" || !orders) {
    return (
      <div className="min-h-screen bg-gradient-to-br py-8 sm:px-4 lg:mt-15 mt-10 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">❌ Gagal memuat data jasa</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br py-8 sm:px-4 lg:mt-15 mt-10">
      <StatusMessage status={createStatus} error={createError} />

      <div className="max-w-4xl mx-auto">
        <div className="bg-white sm:rounded-2xl sm:shadow-xl overflow-hidden">
          <ReviewHeader />

          {isSubmitted ? (
            <ReviewSuccess serviceName={orders.nama_jasa} onReset={resetForm} />
          ) : (
            <div className="p-6">
              <ServiceCard service={orders} />
              
              <RatingInput
                selectedRating={selectedRating}
                onRatingChange={handleRatingChange}
              />

              <ReviewForm
                reviewText={reviewText}
                onReviewChange={setReviewText}
                onSubmit={handleSubmit}
                onReset={() => {
                  setSelectedRating(0);
                  setReviewText("");
                }}
                isSubmitting={createStatus === "loading"}
                isValid={selectedRating > 0 && reviewText.length >= 10}
              />
            </div>
          )}

          {/* Footer */}
          <div className="bg-green-50 px-6 py-4 text-center text-sm text-gray-600 sm:border-t">
            <p>
              Penilaian Anda sangat berharga untuk membantu kami meningkatkan
              kualitas jasa dan layanan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;

