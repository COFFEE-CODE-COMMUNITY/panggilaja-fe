import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { selectReviewService } from "../../../features/serviceSlice";
import { selectSelectedSeller } from "../../../features/sellerSlice";

const InformationServiceForSeller = ({
    nameService,
    totalReview,
    topPrice,
    basePrice,
    description,
    totalReviewSeller,
    averageRating,
}) => {
    const [showMoreDesc, setShowMoreDesc] = useState(false);

    // Still keeping these mainly for display consistency if needed, but not linking to profile
    const sellerProfile = useSelector(selectSelectedSeller);

    // No specific actions needed for seller view (no favorites, no chat init here)

    // Format rating to 1 decimal place
    const formattedRating = averageRating ? Number(averageRating).toFixed(1) : "0.0";

    return (
        <div className="h-full flex-1 w-full flex flex-col gap-6 lg:py-0 py-6">
            <div className="flex flex-col gap-6">
                <div className="space-y-4">
                    <div className="flex justify-between items-start gap-4">
                        <div className="space-y-1 w-full">
                            {/* Removed Seller Link/Name as requested "nama penjualnya dihilangkan" */}
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                                {nameService}
                            </h1>
                        </div>

                        {/* Removed Favorite Button */}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <FaStar className="text-yellow-400" />
                            <span className="font-medium text-gray-900">{formattedRating}</span>
                            <span>({totalReview || 0} ulasan)</span>
                        </div>
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        {/* pesanan selesai: keep existing logic (displayed if passed, else 0) - backend doesn't support specific count yet */}
                        <div>{totalReviewSeller || 0} Pesanan selesai</div>
                    </div>
                </div>

                <div className="h-px bg-gray-100"></div>

                <div>
                    <p className="text-sm text-gray-500 mb-1">Mulai dari</p>
                    <div className="flex items-baseline gap-2">
                        <h2 className="text-3xl font-bold text-primary">
                            Rp {parseInt(basePrice).toLocaleString('id-ID')}
                            {topPrice && topPrice > basePrice && (
                                <span className="text-lg text-gray-400 font-normal ml-2">
                                    - Rp {parseInt(topPrice).toLocaleString('id-ID')}
                                </span>
                            )}
                        </h2>
                    </div>
                </div>

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

                {/* Removed Action Buttons (Contact/Nego) */}
            </div>
        </div>
    );
};

export default InformationServiceForSeller;
