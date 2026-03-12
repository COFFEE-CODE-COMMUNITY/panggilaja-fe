import { create } from 'zustand';

const useSearchStore = create((set) => ({
    searchText: '',
    status: '', // Not sure what status implies here (maybe category or active filter), keeping as string

    setSearchText: (text) => set({ searchText: text }),
    setStatus: (newStatus) => set({ status: newStatus }),
}));

export default useSearchStore;
