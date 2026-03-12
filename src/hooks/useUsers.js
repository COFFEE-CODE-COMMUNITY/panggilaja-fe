import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../services/userService';

export const useGetProfile = (id) => {
    return useQuery({
        queryKey: ['profile', id],
        queryFn: () => userService.seeProfile(id),
        enabled: !!id,
    });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => userService.updateProfile(id, data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['profile', id] });
        },
    });
};

export const useAddAddress = (options) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => userService.addAddress(id, data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['addresses', id] });
            if (options?.onSuccess) options.onSuccess(_, { id });
        },
        ...options
    });
};

export const useGetAddresses = (id) => {
    return useQuery({
        queryKey: ['addresses', id],
        queryFn: () => userService.seeAddress(id),
        enabled: !!id,
    });
};

export const useGetUserOrders = (id) => {
    return useQuery({
        queryKey: ['userOrders', id],
        queryFn: () => userService.getOrders(id),
        enabled: !!id,
    });
};
