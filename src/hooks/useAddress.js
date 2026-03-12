import { useQuery } from '@tanstack/react-query';
import { addressService } from '../services/addressService';

export const useGetProvinces = () => {
    return useQuery({
        queryKey: ['provinces'],
        queryFn: addressService.fetchProvinces,
        staleTime: 24 * 60 * 60 * 1000, // 24 hours - geography data rarely changes
    });
};

export const useGetRegencies = (provinceId) => {
    return useQuery({
        queryKey: ['regencies', provinceId],
        queryFn: () => addressService.fetchRegencies(provinceId),
        enabled: !!provinceId,
        staleTime: 24 * 60 * 60 * 1000, // 24 hours
    });
};

export const useGetDistricts = (regencyId) => {
    return useQuery({
        queryKey: ['districts', regencyId],
        queryFn: () => addressService.fetchDistricts(regencyId),
        enabled: !!regencyId,
        staleTime: 24 * 60 * 60 * 1000, // 24 hours
    });
};
