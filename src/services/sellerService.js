import apiFetch from "../api/api";

export const sellerService = {
    getSellers: async () => {
        const response = await apiFetch("sellers", {
            method: "GET",
        });
        return response.data;
    },

    getSellerById: async (id) => {
        const response = await apiFetch(`users/${id}/seller`, {
            method: "GET",
        });
        return response.data;
    },

    addSeller: async (data) => {
        return await apiFetch("sellers", {
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    addDocs: async (data) => {
        return await apiFetch("docs/seller", {
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    deleteDocs: async (id) => {
        return await apiFetch(`docs/${id}`, {
            method: "DELETE",
        });
    },

    getAllServicesByIdSeller: async (id) => {
        return await apiFetch(`sellers/${id}/services`, {
            method: "GET",
        });
    },

    getDocs: async () => {
        return await apiFetch("docs/seller", {
            method: "GET",
        });
    },

    getDocsById: async (id) => {
        const response = await apiFetch(`sellers/${id}/docs`, {
            method: "GET",
        });
        console.log(response)
        return response.data;
    },

    updateSellerById: async (id, data) => {
        return await apiFetch(`sellers/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
        });
    },

    deleteSellerById: async (id) => {
        // Delete All Services
        try {
            const servicesRes = await apiFetch(`sellers/${id}/services`, { method: "GET" });
            const services = servicesRes.data?.data || servicesRes.data;

            if (Array.isArray(services) && services.length > 0) {
                await Promise.all(
                    services.map((service) =>
                        apiFetch(`services/${service.id}`, { method: "DELETE" }).catch((err) =>
                            console.error("Failed to delete service", service.id, err)
                        )
                    )
                );
            }
        } catch (serviceErr) {
            console.error("Error fetching/deleting services:", serviceErr);
        }

        // Delete All Docs
        try {
            const docsRes = await apiFetch(`sellers/${id}/docs`, { method: "GET" });
            const docs = docsRes.data?.data || docsRes.data;

            if (Array.isArray(docs) && docs.length > 0) {
                await Promise.all(
                    docs.map((doc) =>
                        apiFetch(`docs/${doc.id}`, { method: "DELETE" }).catch((err) =>
                            console.error("Failed to delete doc", doc.id, err)
                        )
                    )
                );
            }
        } catch (docsErr) {
            console.error("Error fetching/deleting docs:", docsErr);
        }

        // Delete Seller Profile
        return await apiFetch(`sellers/${id}`, {
            method: "DELETE",
        });
    },

    getOrderBySellerId: async (id) => {
        return await apiFetch(`sellers/${id}/orders`, {
            method: "GET",
        });
    },
};
