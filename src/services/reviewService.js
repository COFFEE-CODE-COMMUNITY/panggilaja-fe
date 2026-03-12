import apiFetch from "../api/api";

export const reviewService = {
    createNewReview: async (orderId, reviewData) => {
        return await apiFetch(`review/service/${orderId}`, {
            method: "POST",
            body: JSON.stringify(reviewData),
        });
    },

    getReviewsBySellerId: async (sellerId) => {
        return await apiFetch(`review/seller/${sellerId}`, {
            method: "GET",
        });
    },
};
