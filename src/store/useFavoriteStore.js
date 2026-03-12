import { create } from 'zustand';

const useFavoriteStore = create((set) => ({
    favorites: [], // Array of favorite objects { id, service_id, ... }

    setFavorites: (favorites) => set({ favorites }),

    addFavoriteOptimistic: (serviceId) => set((state) => ({
        favorites: [...state.favorites, { id: 'temp-' + Date.now(), service_id: serviceId, isOptimistic: true }]
    })),

    removeFavoriteOptimistic: (serviceId) => set((state) => ({
        favorites: state.favorites.filter(f => f.service_id !== serviceId)
    })),

    isFavorite: (serviceId) => (state) => state.favorites.some(f => f.service_id === serviceId)
}));

export default useFavoriteStore;
