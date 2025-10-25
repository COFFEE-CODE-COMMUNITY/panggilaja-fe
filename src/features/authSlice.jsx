import { jwtDecode } from "jwt-decode"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../api/api"

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

    changeAccountStatus : 'idle',
    changeAccountMessage : null,
    changeAccountError : null,

    changeAccountToBuyerStatus : 'idle',
    changeAccountToBuyerMessage : null,
    changeAccountToBuyerError : null,

    isVerified : false,
    resetEmail : null,
    resetCode : null
}

const url = 'http://localhost:5000/api/'

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await api.post(`${url}auth/login`, userData);
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
    async (userData, { rejectWithValue }) => {
        try {
            const response = await api.post(`${url}auth/register`, userData);
            return response.data;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue({ message: 'Gagal terhubung ke server. Cek koneksi.' });
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.post(`${url}auth/logout`);
            return response.data;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue({ message: 'Gagal logout' });
        }
    }
);

export const requestResetPassword = createAsyncThunk(
    'auth/requestResetPassword',
    async (email, {rejectWithValue}) => {
        try {
            const response = await api.post(`${url}auth/request-reset`, {email});
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
            const response = await api.post(`${url}auth/verify-reset-code`, data);
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
            const response = await api.post(`${url}auth/reset-password`, data);
            return response.data;
        }catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data); 
            }
            return rejectWithValue({ message: 'Gagal terhubung ke server. Cek koneksi.' });
        }
    }
);

export const changeAccount = createAsyncThunk(
    'auth/changeAccount',
    async (_, {rejectWithValue}) => {
        try {
            const response = await api.post(`${url}auth/change-user`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            }, { withCredentials: true });
            return response.data;
        }catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data); 
            }
            return rejectWithValue({ message: 'Gagal terhubung ke server. Cek koneksi.' });
        }
    }
);

export const changeAccountToBuyer = createAsyncThunk(
    'auth/changeAccountToBuyer',
    async (_, {rejectWithValue}) => {
        try {
            const response = await api.post(`${url}auth/change-user`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            }, { withCredentials: true });
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
            state.status = 'idle'
            localStorage.removeItem('accessToken')
            localStorage.removeItem('user')
        }
    },
    extraReducers : (builder) => {
        builder
            //login
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                const { status, message, data } = action.payload
                const { accessToken, userInfo } = data.user

                const decodeToken = jwtDecode(accessToken)
                const userData = decodeToken.user
                
                state.status = 'success'
                state.error = null
                state.message = message
                state.accessToken = accessToken
                state.user = userData

                localStorage.setItem('accessToken', accessToken)
                localStorage.setItem('user', JSON.stringify(userData))
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.message = action.payload?.message || 'Login gagal'
                state.status = 'failed'
                state.error = action.payload
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
            })

            //register
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                const {status, message} = action.payload
                state.status = 'success'
                state.error = null
                state.message = message
                state.accessToken = null
                state.user = null
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.payload || action.error.message; 
                state.message = action.payload?.message || 'Pendaftaran gagal.'
                state.status = 'failed'
                state.accessToken = null
                state.user = null
            })

            //logout
            .addCase(logoutUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null
                state.accessToken = null
                state.error = null
                state.message = 'Logout berhasil'
                state.status = 'idle'
                localStorage.removeItem('accessToken')
                localStorage.removeItem('user')
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.user = null
                state.accessToken = null
                state.error = null
                state.status = 'idle'
                localStorage.removeItem('accessToken')
                localStorage.removeItem('user')
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
            .addCase(verifyCodeResetPassword.pending, (state) => {
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
            .addCase(resetPassword.pending, (state) => {
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
                state.resetPasswordStatus = 'failed'
                state.resetPasswordMessage = action.payload
            })

            //change account
            .addCase(changeAccount.pending, (state) => {
                state.changeAccountStatus = 'loading'
                state.changeAccountMessage = null
                state.changeAccountError = null
            })
            .addCase(changeAccount.fulfilled, (state, action) => {
                const { status, message, data } = action.payload
                const { accessToken } = data.user

                const decodeToken = jwtDecode(accessToken)
                const userData = decodeToken.user
                
                state.changeAccountToBuyerStatus = 'idle'
                state.changeAccountStatus = status
                state.changeAccountMessage = message

                localStorage.removeItem('accessToken')
                localStorage.removeItem('user')

                state.accessToken = accessToken; 
                state.user = userData;

                localStorage.setItem('accessToken', accessToken)
                localStorage.setItem('user', JSON.stringify(userData))
            })
            .addCase(changeAccount.rejected, (state, action) => {
                state.changeAccountStatus = 'failed'
                state.changeAccountMessage = action.payload
            })

            //change account to buyer
            .addCase(changeAccountToBuyer.pending, (state) => {
                state.changeAccountToBuyerStatus = 'loading'
                state.changeAccountToBuyerMessage = null
                state.changeAccountToBuyerError = null
            })
            .addCase(changeAccountToBuyer.fulfilled, (state, action) => {
                const { status, message, data } = action.payload
                const { accessToken } = data.user

                const decodeToken = jwtDecode(accessToken)
                const userData = decodeToken.user
                
                state.changeAccountToBuyerStatus = status
                state.changeAccountStatus = 'idle'
                state.changeAccountToBuyerMessage = message

                localStorage.removeItem('accessToken')
                localStorage.removeItem('user')

                state.accessToken = accessToken; 
                state.user = userData;

                localStorage.setItem('accessToken', accessToken)
                localStorage.setItem('user', JSON.stringify(userData))
            })
            .addCase(changeAccountToBuyer.rejected, (state, action) => {
                state.changeAccountToBuyerStatus = 'failed'
                state.changeAccountToBuyerMessage = action.payload
            })
    }
})

export const { logout } = authSlice.actions
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

export const selectChangeAccountStatus = (state) => state.auth.changeAccountStatus;
export const selectChangeAccountError = (state) => state.auth.changeAccountError;
export const selectChangeAccountMessage = (state) => state.auth.changeAccountMessage;

export const selectChangeAccountToBuyerStatus = (state) => state.auth.changeAccountToBuyerStatus;
export const selectChangeAccountToBuyerError = (state) => state.auth.changeAccountToBuyerError;
export const selectChangeAccountToBuyerMessage = (state) => state.auth.changeAccountToBuyerMessage;

export default authSlice.reducer