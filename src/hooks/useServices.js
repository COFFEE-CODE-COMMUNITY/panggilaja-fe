import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { serviceService } from '../services/serviceService';
import useFavoriteStore from '../store/useFavoriteStore';

export const useGetServices = () => {
    return useQuery({
        queryKey: ['services'],
        queryFn: serviceService.getServices,
    });
};

export const useGetServiceById = (id) => {
    return useQuery({
        queryKey: ['services', id],
        queryFn: () => serviceService.getServicesById(id),
        enabled: !!id,
    });
};

export const useGetServicesAround = (id, kecamatan) => {
    return useQuery({
        queryKey: ['servicesAround', id, kecamatan],
        queryFn: () => serviceService.getServicesAround(id, kecamatan),
        enabled: !!id && !!kecamatan,
    });
};

export const useGetCategoryService = () => {
    return useQuery({
        queryKey: ['serviceCategories'],
        queryFn: serviceService.getCategoryService,
    });
};

export const useGetFavoriteServices = (id) => {
    const setFavorites = useFavoriteStore((state) => state.setFavorites);
    return useQuery({
        queryKey: ['favoriteServices', id],
        queryFn: async () => {
            const response = await serviceService.getFavoriteService(id);
            if (response?.success && response?.data) {
                setFavorites(response.data);
            }
            return response;
        },
        enabled: !!id,
    });
};

export const useAddFavoriteService = () => {
    const queryClient = useQueryClient();
    const addFavoriteOptimistic = useFavoriteStore((state) => state.addFavoriteOptimistic);
    const removeFavoriteOptimistic = useFavoriteStore((state) => state.removeFavoriteOptimistic);

    return useMutation({
        mutationFn: (id) => serviceService.addFavoriteService(id),
        onMutate: async (id) => {
            addFavoriteOptimistic(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favoriteServices'] });
        },
        onError: (_, id) => {
            removeFavoriteOptimistic(id);
        }
    });
};

export const useDeleteFavoriteService = (serviceId) => {
    const queryClient = useQueryClient();
    const addFavoriteOptimistic = useFavoriteStore((state) => state.addFavoriteOptimistic);
    const removeFavoriteOptimistic = useFavoriteStore((state) => state.removeFavoriteOptimistic);

    return useMutation({
        mutationFn: (id) => serviceService.deleteFavoriteService(id),
        onMutate: async () => {
            if (serviceId) removeFavoriteOptimistic(serviceId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favoriteServices'] });
        },
        onError: () => {
            if (serviceId) addFavoriteOptimistic(serviceId);
        }
    });
};

export const useAddService = (sellerId) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => serviceService.addService(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] });
            queryClient.invalidateQueries({ queryKey: ['sellerServices', sellerId] });
        },
    });
};

export const useEditService = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => serviceService.editService(id, data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['services', id] });
            queryClient.invalidateQueries({ queryKey: ['services'] });
        },
    });
};

export const useDeleteService = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => serviceService.deleteService(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] });
        },
    });
};

export const useGetReviewServicesById = (id) => {
    return useQuery({
        queryKey: ['serviceReviews', id],
        queryFn: () => serviceService.getReviewServicesById(id),
        enabled: !!id,
    });
};
