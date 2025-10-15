import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";

export const getServices = createAsyncThunk(
    'services/getServices',
    async () => {
        const res = await axios.get('http://localhost:3000/services')
        return res.data
    }
)

export const getServicesById = createAsyncThunk(
    'services/getServicesById',
    async (id) => {
        const res = await axios.get(`http://localhost:3000/services/${id}`)
        return res.data
    }
)

export const getReviewByServicesById = createAsyncThunk(
    'services/getReviewServicesById',
    async (id) => {
        const res = await axios.get(`http://localhost:3000/reviews?service_id=${id}`)
        return res.data
    }
)

export const getDetailServices = createAsyncThunk(
    'services/getDetailServices',
    async () => {
        const res = await axios.get(`http://localhost:3000/providers`)
        return res.data
    }
)

export const getDetailServicesById = createAsyncThunk(
    'services/getDetailServicesById',
    async (id) => {
        const res = await axios.get(`http://localhost:3000/providers/${id}`)
        return res.data
    }
)

const serviceEntity = createEntityAdapter({
    selectId : (service) => service.id
})

const reviewEntity = createEntityAdapter({
    selectId : (review) => review.id
})

const detailServiceEntity = createEntityAdapter({
    selectId : (detail) => detail.id
})

const serviceSlice = createSlice({
    name : 'service',
    initialState : serviceEntity.getInitialState({
        allServiceStatus : 'idle',
        allServiceError : null,

        selectedService : null,
        selectedServiceStatus : 'idle',
        selectedServiceError : null,
        
        reviewService : reviewEntity.getInitialState(),
        reviewServiceStatus : 'idle',
        reviewServiceError : null,

        allDetailService : detailServiceEntity.getInitialState(),
        allDetailServiceStatus : 'idle',
        allDetailServiceError : null,

        detailService : null,
        detailServiceStatus : 'idle',
        detailServiceError : null,
    }),
    reducers : {},
    extraReducers : (builder) => {
        builder
            //get service
            .addCase(getServices.pending, (state) => {
                state.allServiceStatus = 'loading'
            })
            .addCase(getServices.fulfilled, (state, action) => {
                state.allServiceStatus = 'success',
                serviceEntity.setAll(state, action.payload)
            })
            .addCase(getServices.rejected, (state, action) => {
                state.allServiceStatus = 'error',
                state.allServiceError = action.error.message
            })

            //get service by id
            .addCase(getServicesById.pending, (state) => {
                state.selectedServiceStatus = 'loading'
            })
            .addCase(getServicesById.fulfilled, (state, action) => {
                state.selectedServiceStatus = 'success',
                state.selectedService = action.payload
            })
            .addCase(getServicesById.rejected, (state, action) => {
                state.selectedServiceStatus = 'error',
                state.selectedServiceError = action.error.message
            })

            //get review
            .addCase(getReviewByServicesById.pending, (state) => {
                state.reviewServiceStatus = 'loading'
            })
            .addCase(getReviewByServicesById.fulfilled, (state, action) => {
                state.reviewServiceStatus = 'success',
                reviewEntity.setAll(state.reviewService, action.payload)
            })
            .addCase(getReviewByServicesById.rejected, (state, action) => {
                state.reviewServiceStatus = 'error',
                state.reviewServiceStatus = action.error.message
            })

            //get all detail service
            .addCase(getDetailServices.pending, (state) => {
                state.allDetailServiceStatus = 'loading'
            })
            .addCase(getDetailServices.fulfilled, (state, action) => {
                state.allDetailServiceStatus = 'success',
                detailServiceEntity.setAll(state.allDetailService, action.payload)
            })
            .addCase(getDetailServices.rejected, (state, action) => {
                state.allDetailServiceStatus = 'error',
                state.allDetailServiceError = action.error.message
            })

            //get detail service by id
            .addCase(getDetailServicesById.pending, (state) => {
                state.detailServiceStatus = 'loading'
            })
            .addCase(getDetailServicesById.fulfilled, (state, action) => {
                state.detailServiceStatus = 'success',
                state.detailService = action.payload
            })
            .addCase(getDetailServicesById.rejected, (state, action) => {
                state.detailServiceStatus = 'error',
                state.detailServiceStatus = action.error.message
            })
    }
})

export const {
    selectAll : selectAllService,
    selectById : selectdServiceById
} = serviceEntity.getSelectors(state => state.service)

export const {
    selectAll : selectAllServiceReview
} = reviewEntity.getSelectors(state => state.service.reviewService)

export const {
    selectAll : selectAllDetailService
} = detailServiceEntity.getSelectors(state => state.service.allDetailService)

export const selectSelectedService = (state) => state.service.selectedService
export const selectSelectedServiceStatus = (state) => state.service.selectedServiceStatus
export const selectSelectedServiceError = (state) => state.service.selectedServiceError

export const selectAllServiceStatus = (state) => state.service.allServiceStatus
export const selectAllServiceError = (state) => state.service.allServiceError

export const selectReviewServiceStatus = (state) => state.service.reviewServiceStatus
export const selectReviewServiceError = (state) => state.service.reviewServiceError

export const selectAllDetailServiceStatus = (state) => state.service.allDetailServiceStatus
export const selectAllDetailServiceError = (state) => state.service.allDetailServiceError

export const selectDetailService = (state) => state.service.detailService 
export const selectDetailServiceStatus = (state) => state.service.detailServiceStatus
export const selectDetailServiceError = (state) => state.service.detailServiceError

export default serviceSlice.reducer
