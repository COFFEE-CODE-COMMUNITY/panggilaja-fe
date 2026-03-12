import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewService } from '../services/reviewService';

export const useGetReviewsBySellerId = (sellerId) => {
    return useQuery({
        queryKey: ['sellerReviews', sellerId],
        queryFn: () => reviewService.getReviewsBySellerId(sellerId),
        enabled: !!sellerId,
    });
};

export const useCreateNewReview = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ orderId, reviewData }) => reviewService.createNewReview(orderId, reviewData),
        onSuccess: (_, { orderId }) => {
            queryClient.invalidateQueries({ queryKey: ['serviceReviews', orderId] });
            queryClient.invalidateQueries({ queryKey: ['sellerReviews'] });
            queryClient.invalidateQueries({ queryKey: ['order', orderId] });
        },
    });
};
