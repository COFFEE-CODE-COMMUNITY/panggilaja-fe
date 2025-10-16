const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit")
const { default: api } = require("../api/apiInstance")

const getToken = () => localStorage.getItem('accessToken')
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
    refreshToken: localStorage.getItem('refreshToken'),
    status : 'idle',
    error : null,
    successMessage : null
}

const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credential) => {
        const response = await api.post('api/auth/login', credential)
        return response.data
    }
)

const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (credential) => {
        const response = await api.post('api/auth/register', credential)
        return response.data
    }
)

export const refreshAccessToken = createAsyncThunk(
    'auth/refreshAccessToken',
    async (refreshToken) => {
        const response = await api.post('/auth/refresh', { refreshToken }); 
        return response.data; 
    }
);

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        logout : (state) => {
            state.user = null;
            state.accessToken = null
            state.refreshToken = null
            state.successMessage = null
            localStorage.removeItem('accessToken')
            localStorage.removeItem('user')
        }
    }
})