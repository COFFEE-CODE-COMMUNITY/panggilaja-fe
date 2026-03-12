import apiFetch from "../api/api";

export const chatService = {
    getContactForBuyer: async (id) => {
        const response = await apiFetch(`chat/${id}/buyer`, {
            method: "GET",
        });
        console.log(response)
        return response.data;
    },

    getContactForSeller: async (id) => {
        const response = await apiFetch(`chat/${id}/seller`, {
            method: "GET",
        });
        return response.data;
    },

    getChatMessages: async (partnerId) => {
        const response = await apiFetch(`chat/${partnerId}`, {
            method: "GET",
        });
        console.log(response)
        return response.data;
    },
};
