import apiFetch from "../api/api";

export const authService = {
    login: async (userData) => {
        return await apiFetch("auth/login", {
            method: "POST",
            body: JSON.stringify(userData),
        });
    },

    register: async (userData) => {
        return await apiFetch("auth/register", {
            method: "POST",
            body: JSON.stringify(userData),
        });
    },

    logout: async () => {
        return await apiFetch("auth/logout", {
            method: "POST",
        });
    },

    requestResetPassword: async (email) => {
        return await apiFetch("auth/request-reset", {
            method: "POST",
            body: JSON.stringify({ email }),
        });
    },

    verifyCodeResetPassword: async (data) => {
        return await apiFetch("auth/verify-reset-code", {
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    resetPassword: async (data) => {
        return await apiFetch("auth/reset-password", {
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    changeAccount: async (data) => {
        return await apiFetch("auth/change-user", {
            method: "POST",
            body: JSON.stringify(data),
        });
    },
};
