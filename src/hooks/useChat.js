import { useQuery } from '@tanstack/react-query';
import { chatService } from '../services/chatService';

export const useGetContactForBuyer = (id) => {
    return useQuery({
        queryKey: ['contactsBuyer', id],
        queryFn: () => chatService.getContactForBuyer(id),
        enabled: !!id,
    });
};

export const useGetContactForSeller = (id) => {
    return useQuery({
        queryKey: ['contactsSeller', id],
        queryFn: () => chatService.getContactForSeller(id),
        enabled: !!id,
    });
};

export const useGetChatMessages = (partnerId) => {
    return useQuery({
        queryKey: ['chatMessages', partnerId],
        queryFn: () => chatService.getChatMessages(partnerId),
        enabled: !!partnerId,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
