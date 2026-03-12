import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            isVerified: false,
            resetEmail: null,
            resetCode: null,

            setAuth: (accessToken, user) => {
                set({ accessToken, user });
            },

            updateProfile: (user) => {
                set({ user });
            },

            logout: () => {
                set({ accessToken: null, user: null });
            },

            setResetEmail: (email) => set({ resetEmail: email }),
            setResetCode: (code) => set({ resetCode: code }),
        }),
        {
            name: 'auth-storage', // key for localStorage
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useAuthStore;
