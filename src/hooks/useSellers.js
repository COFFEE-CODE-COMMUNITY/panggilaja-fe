import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sellerService } from '../services/sellerService';

export const useGetSellers = () => {
    return useQuery({
        queryKey: ['sellers'],
        queryFn: sellerService.getSellers,
    });
};

export const useGetSellerById = (id) => {
    return useQuery({
        queryKey: ['seller', id],
        queryFn: () => sellerService.getSellerById(id),
        enabled: !!id,
    });
};

export const useAddSeller = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => sellerService.addSeller(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sellers'] });
        },
    });
};

export const useAddDocs = () => {
    return useMutation({
        mutationFn: (data) => sellerService.addDocs(data),
    });
};

export const useDeleteDocs = () => {
    return useMutation({
        mutationFn: (id) => sellerService.deleteDocs(id),
    });
};

export const useGetSellerServices = (id) => {
    return useQuery({
        queryKey: ['sellerServices', id],
        queryFn: () => sellerService.getAllServicesByIdSeller(id),
        enabled: !!id,
    });
};

export const useGetDocs = () => {
    return useQuery({
        queryKey: ['docs'],
        queryFn: sellerService.getDocs,
    });
};

export const useGetDocsById = (id) => {
    return useQuery({
        queryKey: ['docs', id],
        queryFn: () => sellerService.getDocsById(id),
        enabled: !!id,
    });
};

export const useUpdateSellerById = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => sellerService.updateSellerById(id, data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['seller', id] });
            queryClient.invalidateQueries({ queryKey: ['sellers'] });
        },
    });
};

export const useDeleteSellerById = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => sellerService.deleteSellerById(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sellers'] });
        },
    });
};

export const useGetOrdersBySellerId = (id) => {
    return useQuery({
        queryKey: ['sellerOrders', id],
        queryFn: () => sellerService.getOrderBySellerId(id),
        enabled: !!id,
    });
};
