import { create } from 'zustand';

const useChatStore = create((set, get) => ({
    onlineUsers: {}, // Key: "role_userId"

    setOnlineUsers: (onlineList) => {
        const newOnlineUsers = {};
        onlineList.forEach(u => {
            const role = u.role?.toLowerCase();
            const key = `${role}_${u.userId}`;
            newOnlineUsers[key] = true;
        });
        set({ onlineUsers: newOnlineUsers });
    },

    updateUserStatus: (userId, role, isOnline) => {
        set(state => {
            const normalizedRole = role?.toLowerCase();
            const userKey = `${normalizedRole}_${userId}`;
            const newOnlineUsers = { ...state.onlineUsers };

            if (isOnline) {
                newOnlineUsers[userKey] = true;
            } else {
                delete newOnlineUsers[userKey];
            }

            return { onlineUsers: newOnlineUsers };
        });
    },

    resetChat: () => {
        set({ onlineUsers: {} });
    }
}));

export default useChatStore;
