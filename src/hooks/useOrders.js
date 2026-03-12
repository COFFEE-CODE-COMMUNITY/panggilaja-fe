import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '../services/orderService';

export const useGetOrderById = (orderId) => {
    return useQuery({
        queryKey: ['order', orderId],
        queryFn: () => orderService.getOrderById(orderId),
        enabled: !!orderId,
    });
};

export const useGetBuyerOrders = () => {
    return useQuery({
        queryKey: ['buyerOrders'],
        queryFn: orderService.getBuyerOrders,
    });
};

export const useGetSellerOrders = () => {
    return useQuery({
        queryKey: ['sellerOrders'],
        queryFn: orderService.getSellerOrders,
    });
};

export const useCreateOrder = (options = {}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (orderData) => orderService.createOrder(orderData),
        ...options,
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ['buyerOrders'] });
            queryClient.invalidateQueries({ queryKey: ['sellerOrders'] });
            if (options.onSuccess) options.onSuccess(data, variables, context);
        },
    });
};

export const useUpdateOrderStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ orderId, status }) => orderService.updateOrderStatus(orderId, status),
        onSuccess: (_, { orderId }) => {
            queryClient.invalidateQueries({ queryKey: ['order', orderId] });
            queryClient.invalidateQueries({ queryKey: ['buyerOrders'] });
            queryClient.invalidateQueries({ queryKey: ['sellerOrders'] });
        },
    });
};

export const useDeleteOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (orderId) => orderService.deleteOrder(orderId),
        onSuccess: (_, orderId) => {
            queryClient.removeQueries({ queryKey: ['order', orderId] });
            queryClient.invalidateQueries({ queryKey: ['buyerOrders'] });
            queryClient.invalidateQueries({ queryKey: ['sellerOrders'] });
        },
    });
};
