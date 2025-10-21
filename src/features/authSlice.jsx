import { jwtDecode } from "jwt-decode"
import api from '../api/apiInstance'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const getToken = () => localStorage.getItem('accessToken') || null
const getUser = () => {
    try {
        const userData = localStorage.getItem('user')
        return userData ? JSON.parse(userData) : null
    } catch {
        return null
    }
}

const initialState = {
    user : getUser(),
    accessToken : getToken(),
    status : 'idle',
    error : null,
    message : null,

    resetPasswordRequestStatus : 'idle',
    resetPasswordRequestMessage : null,
    resetPasswordRequestError : null,

    resetPasswordVerifyStatus : 'idle',
    resetPasswordVerifyMessage : null,
    resetPasswordVerifyError : null,

    resetPasswordStatus : 'idle',
    resetPasswordMessage : null,
    resetPasswordError : null,

    isVerified : false,
    resetEmail : null,
    resetCode : null
}

const url = 'http://localhost:5000/api/'

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${url}auth/login`, userData);
            return response.data;
        }catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data); 
            }
            return rejectWithValue({ message: 'Gagal terhubung ke server. Cek koneksi.' });
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData) => {
        const response = await axios.post(`${url}auth/register`, userData);
        return response.data;
    }
);

export const refreshAccessToken = createAsyncThunk(
    'auth/refreshAccessToken',
    async () => {
        const response = await axios.post(`${url}auth/refresh`); 
        return response.data; 
    }
)

export const requestResetPassword = createAsyncThunk(
    'auth/requestResetPassword',
    async (email, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${url}auth/request-reset`, {email});
            return { message: response.data, email: email };
        }catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data); 
            }
            return rejectWithValue({ message: 'Gagal terhubung ke server. Cek koneksi.' });
        }
    }
);

export const verifyCodeResetPassword = createAsyncThunk(
    'auth/verifyCodeResetPassword',
    async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${url}auth/verify-reset-code`, data);
            return response.data;
        }catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data); 
            }
            return rejectWithValue({ message: 'Gagal terhubung ke server. Cek koneksi.' });
        }
    }
);

export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${url}auth/reset-password`, data);
            return response.data;
        }catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data); 
            }
            return rejectWithValue({ message: 'Gagal terhubung ke server. Cek koneksi.' });
        }
    }
);

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        logout : (state) => {
            state.user = null;
            state.accessToken = null
            state.error = null
            state.message = null
            state.status = null
            localStorage.removeItem('accessToken')
            localStorage.removeItem('user')
        },
        setNewAccessToken : (state, action) => {
            state.accessToken = action.payload
            localStorage.setItem('accessToken', action.payload)
        }
    },
    extraReducers : (builder) => {
        builder
            //login
            .addCase(loginUser.fulfilled, (state, action) => {
                const {status, message, data} = action.payload
                const {accessToken} = data.user

                const decodeToken = jwtDecode(accessToken)
                const userData = decodeToken.user
                
                state.status = status
                state.error = null
                state.message = message
                state.accessToken = accessToken
                state.user = userData

                localStorage.setItem('accessToken', accessToken)
                localStorage.setItem('user', JSON.stringify(userData))
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.message = action.payload.message
                state.status = action.payload.status
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading'
            })

            //register
            .addCase(registerUser.fulfilled, (state, action) => {
                const {status, message} = action.payload
                
                state.status = status
                state.error = null
                state.message = message
                state.accessToken = null
                state.user = null
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.payload || action.error.message; 
                state.message = action.payload || 'Pendaftaran gagal.'
                state.status = 'failed'
                state.accessToken = null
                state.user = null
            })
            .addCase(registerUser.pending, (state, action) => {
                state.status = 'loading'
            })

            //refreshtoken
            .addCase(refreshAccessToken.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.error = null;
            })

            //request password
            .addCase(requestResetPassword.pending, (state) => {
                state.resetPasswordRequestStatus = 'loading';
                state.resetPasswordRequestMessage = null;
                state.resetPasswordRequestError = null;
            })
            .addCase(requestResetPassword.fulfilled, (state, action) => {
                state.resetPasswordRequestStatus = action.payload.message.status;
                state.resetPasswordRequestMessage = action.payload.message.message; 
                state.resetPasswordRequestError = null;
                state.resetEmail = action.payload.email; 
            })
            .addCase(requestResetPassword.rejected, (state, action) => {
                const errorPayload = action.payload || {};
                state.resetPasswordRequestStatus = 'failed'; 
                state.resetPasswordRequestError = errorPayload.message || 'Gagal mengirim kode reset.';
                state.resetPasswordRequestMessage = errorPayload.message || 'Proses gagal.';
                state.resetEmail = null;
            })

            //verify reset password
            .addCase(verifyCodeResetPassword.pending, (state, action) => {
                state.resetPasswordVerifyStatus = 'loading'
                state.resetPasswordVerifyMessage = null
                state.resetPasswordVerifyError = null
            })
            .addCase(verifyCodeResetPassword.fulfilled, (state, action) => {
                state.resetPasswordVerifyStatus = 'success'
                state.resetPasswordVerifyMessage = action.payload.message
                state.isVerified = true
                state.resetCode = action.meta.arg.resetCode
            })
            .addCase(verifyCodeResetPassword.rejected, (state, action) => {
                state.resetPasswordVerifyStatus = 'error'
                state.resetPasswordVerifyMessage = action.payload.message
                state.resetPasswordVerifyError = action.payload.data
                state.isVerified = false
            })

            //reset password
            .addCase(resetPassword.pending, (state, action) => {
                state.resetPasswordStatus = 'loading'
                state.resetPasswordMessage = null
                state.resetPasswordError = null
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.resetPasswordStatus = action.payload.status
                state.resetPasswordMessage = action.payload
                state.isVerified = false
                state.resetEmail = null
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.resetPasswordStatus = action
                state.resetPasswordMessage = action.payload
            })

            
    }
})

export const {logout, setNewAccessToken} = authSlice.actions
export const selectCurrentUser = state => state.auth.user
export const selectAccessToken = state => state.auth.accessToken
export const selectAuthStatus = state => state.auth.status
export const selectAuthError = state => state.auth.error
export const selectAuthMessage = state => state.auth.message

export const selectIsVerified = (state) => state.auth.isVerified;
export const selectResetEmail = (state) => state.auth.resetEmail;
export const selectResetCode = (state) => state.auth.resetCode;

export const selectResetPasswordRequestStatus = (state) => state.auth.resetPasswordRequestStatus;
export const selectResetPasswordRequestError = (state) => state.auth.resetPasswordRequestError;
export const selectResetPasswordRequestMessage = (state) => state.auth.resetPasswordRequestMessage;

export const selectResetPasswordVerifyStatus = (state) => state.auth.resetPasswordVerifyStatus;
export const selectResetPasswordVerifyError = (state) => state.auth.resetPasswordVerifyError;
export const selectResetPasswordVerifyMessage = (state) => state.auth.resetPasswordVerifyMessage;

export const selectResetPasswordStatus = (state) => state.auth.resetPasswordStatus;
export const selectResetPasswordError = (state) => state.auth.resetPasswordError;
export const selectResetPasswordMessage = (state) => state.auth.resetPasswordMessage;

export default authSlice.reducer