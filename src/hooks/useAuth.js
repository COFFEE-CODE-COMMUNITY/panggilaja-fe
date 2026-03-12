import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { jwtDecode } from "jwt-decode";

export const useLogin = () => {
    const setAuth = useAuthStore((state) => state.setAuth);

    return useMutation({
        mutationFn: (credentials) => authService.login(credentials),
        onSuccess: (data) => {
            if (data.status === "success" && data.data?.accessToken) {
                setAuth(data.data.accessToken, data.data.user);
            }
        },
    });
};

export const useRegister = () => {
    return useMutation({
        mutationFn: (userData) => authService.register(userData),
    });
};

export const useLogout = () => {
    const logoutStore = useAuthStore((state) => state.logout);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: () => logout(),
        onSuccess: () => {
            logoutStore();
            queryClient.clear();
            navigate("/login");
        },
        onError: () => {
            // Even if failed on server, clear local state
            logoutStore();
            queryClient.clear();
            navigate("/login");
        }
    });
};

export const useChangeAccount = (options) => {
    const setAuth = useAuthStore((state) => state.setAuth);

    return useMutation({
        mutationKey: ["changeAccount"],
        mutationFn: (data) => authService.changeAccount(data),
        onSuccess: (data) => {
            if (data.status === 'success' && data.data?.accessToken) {
                const token = data.data.accessToken;
                const decoded = jwtDecode(token);
                setAuth(token, decoded.user);
            }
            if (options?.onSuccess) options.onSuccess(data);
        },
        ...options
    });
};

export const useRequestResetPassword = () => {
    return useMutation({
        mutationFn: (email) => authService.requestResetPassword(email),
    });
};

export const useVerifyCodeResetPassword = () => {
    return useMutation({
        mutationFn: (data) => authService.verifyCodeResetPassword(data),
    });
};

export const useResetPassword = () => {
    return useMutation({
        mutationFn: (data) => authService.resetPassword(data),
    });
};
