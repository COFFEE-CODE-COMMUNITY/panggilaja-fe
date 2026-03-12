import apiFetch from "../api/api";

export const userService = {
    addAddress: async (id, data) => {
        return await apiFetch(`users/${id}/addresses`, {
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    seeAddress: async (id) => {
        const response = await apiFetch(`users/${id}/addresses`, {
            method: "GET",
        });
        console.log(response)
        return response.data;
    },

    seeProfile: async (id) => {
        const response = await apiFetch(`users/${id}`, {
            method: "GET",
        });
        return response.data;
    },

    updateProfile: async (id, data) => {
        // data is FormData
        return await apiFetch(`users/${id}`, {
            method: "PUT",
            body: data,
        });
    },

    getOrders: async (id) => {
        const response = await apiFetch(`users/${id}/orders`, {
            method: "GET",
        });
        return response.data;
    },
};
