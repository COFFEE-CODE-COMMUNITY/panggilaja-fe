import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../api/api";

const url = 'http://localhost:5000/api'

export const addAddress = createAsyncThunk(
    'services/addAdress',
    async ({id, data}, { rejectWithValue }) => {
        try {
            const res = await api.post(url+`/users/${id}/addresses`,
                data, 
                {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('accessToken')}`
                },
                withCredentials: true 
            })
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Terjadi kesalahan')
        }
    }
)

export const seeAddress = createAsyncThunk(
    'services/seeAdress',
    async ({id, data}, { rejectWithValue }) => {
        try {
            const res = await api.get(url+`/users/${id}/addresses`,
                data, 
                {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('accessToken')}`
                },
                withCredentials: true 
            })
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Terjadi kesalahan')
        }
    }
)



const userSlice = createSlice({
    name : 'user',
    initialState : {
        addAddress : null,
        addAdressStatus : 'idle',
        addAdressError : null,

        seeAddress : null,
        seeAddressStatus : 'idle',
        seeAddressError : null,
    },
    reducers : {},
    extraReducers : (builder) => {
        builder
            //add service
            .addCase(addAddress.pending, (state) => {
                state.addAdressStatus = 'loading'
                state.addAdressError = null
            })
            .addCase(addAddress.fulfilled, (state, action) => {
                state.addAdressStatus = 'success';
                state.addAddress = action.payload
            })
            .addCase(addAddress.rejected, (state, action) => {
                state.addAdressStatus = 'error';
                state.addAdressError = action.payload || action.error.message
            })

            //get service
            .addCase(seeAddress.pending, (state) => {
                state.seeAddressStatus = 'loading'
            })
            .addCase(seeAddress.fulfilled, (state, action) => {
                state.seeAddressStatus = 'success';
                state.seeAddress = action.payload
            })
            .addCase(seeAddress.rejected, (state, action) => {
                state.seeAddressStatus = 'error';
                state.seeAddressError = action.payload || action.error.message
            })
    }
})

export const selectSelectedAdress = (state) => state.user.addAddress
export const selectSelectedAdressStatus = (state) => state.user.addAdressStatus
export const selectSelectedAdressError = (state) => state.user.addAdressError

export const selectSeeAdress = (state) => state.user.seeAddress
export const selectSeeAdressStatus = (state) => state.user.seeAdressStatus
export const selectSeeAdressError = (state) => state.user.seeAdressError

export default userSlice.reducer