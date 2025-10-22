import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../api/api";

const url = 'http://localhost:5000/api'

export const getServices = createAsyncThunk(
    'services/getServices',
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get(url+'/services',{
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Terjadi kesalahan')
        }
    }
)

export const getServicesById = createAsyncThunk(
    'services/getServicesById',
    async (id, { rejectWithValue }) => {
        try {
            const res = await api.get(url+`/services/${id}`,{
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            return res.data.data || res.data
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Gagal mengambil detail service')
        }
    }
)

const serviceEntity = createEntityAdapter({
    selectId : (service) => service.id
})

const serviceSlice = createSlice({
    name : 'service',
    initialState : serviceEntity.getInitialState({
        allServiceStatus : 'idle',
        allServiceError : null,

        selectedService : null,
        selectedServiceStatus : 'idle',
        selectedServiceError : null,
    }),
    reducers : {},
    extraReducers : (builder) => {
        builder
            //get service
            .addCase(getServices.pending, (state) => {
                state.allServiceStatus = 'loading'
                state.allServiceError = null
            })
            .addCase(getServices.fulfilled, (state, action) => {
                state.allServiceStatus = 'success';
                serviceEntity.setAll(state, action.payload)
            })
            .addCase(getServices.rejected, (state, action) => {
                state.allServiceStatus = 'error';
                state.allServiceError = action.payload || action.error.message
                console.error('Rejected:', action.payload)
            })

            //get service by id
            .addCase(getServicesById.pending, (state) => {
                state.selectedServiceStatus = 'loading'
                state.selectedServiceError = null
            })
            .addCase(getServicesById.fulfilled, (state, action) => {
                state.selectedServiceStatus = 'success';
                state.selectedService = action.payload
            })
            .addCase(getServicesById.rejected, (state, action) => {
                state.selectedServiceStatus = 'error';
                state.selectedServiceError = action.payload || action.error.message
            })
    }
})

export const {
    selectAll : selectAllService,
    selectById : selectdServiceById
} = serviceEntity.getSelectors(state => state.service)

export const selectSelectedService = (state) => state.service.selectedService
export const selectSelectedServiceStatus = (state) => state.service.selectedServiceStatus
export const selectSelectedServiceError = (state) => state.service.selectedServiceError

export const selectAllServiceStatus = (state) => state.service.allServiceStatus
export const selectAllServiceError = (state) => state.service.allServiceError

export default serviceSlice.reducer