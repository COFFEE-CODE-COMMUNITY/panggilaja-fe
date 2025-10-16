import axios from "axios"
import { refreshAccessToken, setNewAccessToken } from "../features/authSlice";
import { ReducerType } from "@reduxjs/toolkit";
ReducerType

const api = axios.create({
    headers : {
        'Content-Type' : 'application/json'
    },
    timeout : 15000
})

let isRefreshing = false; 
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

api.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; 
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        if (error.response.status === 401 && !originalRequest._retry) {
            
            if (isRefreshing) {
                return new Promise(function(resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                .then(token => {
                    originalRequest.headers['Authorization'] = 'Bearer ' + token;
                    return api(originalRequest); 
                })
                .catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true; 
            isRefreshing = true;

            return new Promise(async (resolve, reject) => {
                try {
                    const result = await store.dispatch(refreshAccessToken()).unwrap();
                    const newAccessToken = result.accessToken; 
                    
                    store.dispatch(setNewAccessToken(newAccessToken));
                    
                    processQueue(null, newAccessToken);
                    
                    originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
                    resolve(api(originalRequest));

                } catch (refreshError) {
                    store.dispatch(logout()); 
                    processQueue(refreshError, null); 
                    reject(refreshError);
                } finally {
                    isRefreshing = false; 
                }
            });
        }
        return Promise.reject(error);
    }
);

export default api