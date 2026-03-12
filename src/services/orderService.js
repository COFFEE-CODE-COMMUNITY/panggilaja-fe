import apiFetch from "../api/api";

export const orderService = {
    createOrder: async (orderData) => {
        return await apiFetch("orders", {
            method: "POST",
            body: JSON.stringify(orderData),
        });
    },

    getOrderById: async (orderId) => {
        const response = await apiFetch(`orders/${orderId}`, {
            method: "GET",
        });
        return response.data;
    },

    getBuyerOrders: async () => {
        const response = await apiFetch("orders/buyer", {
            method: "GET",
        });
        return response.data;
    },

    getSellerOrders: async () => {
        const response = await apiFetch("orders/seller/list", {
            method: "GET",
        });
        return response.data;
    },

    updateOrderStatus: async (orderId, status) => {
        return await apiFetch(`orders/${orderId}/status`, {
            method: "PUT",
            body: JSON.stringify({ status }),
        });
    },

    deleteOrder: async (orderId) => {
        return await apiFetch(`orders/${orderId}`, {
            method: "DELETE",
        });
    },
};
