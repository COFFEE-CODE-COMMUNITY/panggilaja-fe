import apiFetch from "../api/api";

export const serviceService = {
    getServices: async () => {
        const response = await apiFetch("services", {
            method: "GET",
        });
        return response.data;
    },

    getServicesAround: async (id, kecamatan) => {
        return await apiFetch(`users/${id}/services?kecamatan=${kecamatan}`, {
            method: "GET",
        });
    },

    getServicesById: async (id) => {
        const response = await apiFetch(`services/${id}`, {
            method: "GET",
        });
        return response.data || response;
    },

    getReviewServicesById: async (id) => {
        return await apiFetch(`review/service/${id}`, {
            method: "GET",
        });
    },

    addFavoriteService: async (id) => {
        return await apiFetch(`users/favorites/${id}`, {
            method: "POST",
        });
    },

    deleteFavoriteService: async (id) => {
        return await apiFetch(`favorites/${id}`, {
            method: "DELETE",
        });
    },

    getFavoriteService: async (id) => {
        return await apiFetch(`users/${id}/favorites`, {
            method: "GET",
        });
    },

    getCategoryService: async () => {
        return await apiFetch("services/category", {
            method: "GET",
        });
    },

    addService: async (data) => {
        return await apiFetch("services", {
            method: "POST",
            body: data, // formData
        });
    },

    editService: async (id, data) => {
        return await apiFetch(`services/${id}`, {
            method: "PUT",
            body: data,
        });
    },

    deleteService: async (id) => {
        return await apiFetch(`services/${id}`, {
            method: "DELETE",
        });
    },
};
