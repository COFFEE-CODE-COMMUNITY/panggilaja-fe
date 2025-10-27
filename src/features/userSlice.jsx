import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";


export const addAddress = createAsyncThunk(
    'user/addAddress', 
    async ({id, data}, { rejectWithValue }) => {
        try {
            console.log('📡 Adding address for user:', id)
            const res = await api.post(`/users/${id}/addresses`, data)
            return res.data
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Terjadi kesalahan')
        }
    }
)

export const seeAddress = createAsyncThunk(
    'user/seeAddress',
    async (id, { rejectWithValue }) => {
        try {
            const res = await api.get(`/users/${id}/addresses`)
            return res.data
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Terjadi kesalahan')
        }
    }
)

export const updateProfile = createAsyncThunk(
    'user/updateProfile',
    async (id, { rejectWithValue }) => {
        try {
            const res = await api.put(`/users/${id}`)
            return res.data
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Terjadi kesalahan')
        }
    }
)

const userSlice = createSlice({
    name : 'user',
    initialState : {
        addAddress : null,
        addAddressStatus : 'idle', 
        addAddressError : null,   

        seeAddress : null,
        seeAddressStatus : 'idle',
        seeAddressError : null,

        updateProfile : null,
        updateProfileStatus : 'idle',
        updateProfileError : null,
    },
    reducers : {},
    extraReducers : (builder) => {
        builder
            //add address
            .addCase(addAddress.pending, (state) => {
                state.addAddressStatus = 'loading'
                state.addAddressError = null
            })
            .addCase(addAddress.fulfilled, (state, action) => {
                state.addAddressStatus = 'success'
                state.addAddress = action.payload
            })
            .addCase(addAddress.rejected, (state, action) => {
                state.addAddressStatus = 'error'
                state.addAddressError = action.payload || action.error.message
            })

            //see address
            .addCase(seeAddress.pending, (state) => {
                state.seeAddressStatus = 'loading'
                state.seeAddressError = null
            })
            .addCase(seeAddress.fulfilled, (state, action) => {
                state.seeAddressStatus = 'success'
                state.seeAddress = action.payload 
            })
            .addCase(seeAddress.rejected, (state, action) => {
                state.seeAddressStatus = 'error'
                state.seeAddressError = action.payload || action.error.message
            })

            //update profile
            .addCase(updateProfile.pending, (state) => {
                state.updateProfileStatus = 'loading'
                state.updateProfileError = null
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.updateProfileStatus = 'success'
                state.updateProfile = action.payload 
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.updateProfileStatus = 'error'
                state.updateProfileError = action.payload || action.error.message
            })
    }
})

export const selectAddAddress = (state) => state.user.addAddress
export const selectAddAddressStatus = (state) => state.user.addAddressStatus
export const selectAddAddressError = (state) => state.user.addAddressError

export const selectSeeAddress = (state) => state.user.seeAddress 
export const selectSeeAddressStatus = (state) => state.user.seeAddressStatus 
export const selectSeeAddressError = (state) => state.user.seeAddressError 

export const selectUpdateProfile = (state) => state.user.updateProfile 
export const selectUpdateProfileStatus = (state) => state.user.updateProfileStatus 
export const selectUpdateProfileError = (state) => state.user.updateProfileError 

export default userSlice.reducer