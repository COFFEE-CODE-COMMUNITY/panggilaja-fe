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
            }, { withCredentials: true })
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
            }, { withCredentials: true })
            return res.data.data || res.data
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Gagal mengambil detail service')
        }
    }
)

export const getReviewServicesById = createAsyncThunk(
    'services/getReviewServicesById',
    async (id, { rejectWithValue }) => {
        try {
            const res = await api.get(url+`/reviews/seller/${id}`,{
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('accessToken')}`
                }
            }, { withCredentials: true })
            return res.data || res.data
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Gagal mengambil detail service')
        }
    }
)

export const addFavoriteService = createAsyncThunk(
    'services/addFavoriteService',
    async (data, { rejectWithValue }) => {
        try {
            const res = await api.post(url+`/users/favorites`,
            data,
            {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('accessToken')}`
                },
                withCredentials: true
            }) 
            return res.data || res.data
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Gagal mengambil detail service')
        }
    }
)

export const getFavoriteService = createAsyncThunk(
    'services/getFavoriteService',
    async (id, { rejectWithValue }) => {
        try {
            const res = await api.get(url+`/users/${id}/favorites`,
            {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('accessToken')}`
                },
            }, 
            { withCredentials: true })
            return res.data || res.data
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Gagal mengambil detail service')
        }
    }
)

export const getCategoryService = createAsyncThunk(
  'seller/getCategoryService',
  async ({ rejectWithValue }) => {
    try {
      const res = await api.get(url + '/services/category', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }, { withCredentials: true });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Terjadi kesalahan');
    }
  }
);

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

        reviewService : null,
        reviewServiceStatus : 'idle',
        reviewServiceError : null,

        getFavoritesService : null,
        getFavoritesServiceStatus : 'idle',
        getFavoritesServiceError : null,

        CategoryService : null,
        CategoryServiceStatus : 'idle',
        CategoryServiceError : null,

        addFavoriteStatus : 'idle',
        addFavoriteError : null,
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

            //get service by id
            .addCase(getReviewServicesById.pending, (state) => {
                state.reviewServiceStatus = 'loading'
                state.reviewServiceError = null
            })
            .addCase(getReviewServicesById.fulfilled, (state, action) => {
                state.reviewServiceStatus = 'success';
                state.reviewService = action.payload
            })
            .addCase(getReviewServicesById.rejected, (state, action) => {
                state.reviewServiceStatus = 'error';
                state.reviewServiceError = action.payload || action.error.message
            })

            //add favorite service
            .addCase(addFavoriteService.pending, (state) => {
                state.addFavoriteStatus = 'loading'
                state.addFavoriteError = null
            })
            .addCase(addFavoriteService.fulfilled, (state) => {
                state.addFavoriteStatus = 'success';
            })
            .addCase(addFavoriteService.rejected, (state, action) => {
                state.addFavoriteStatus = 'error';
                state.addFavoriteError = action.payload || action.error.message
            })

            //get favorite service
            .addCase(getFavoriteService.pending, (state) => {
                state.getFavoriteServiceStatus = 'loading'
                state.getFavoriteServiceError = null
            })
            .addCase(getFavoriteService.fulfilled, (state) => {
                state.getFavoriteServiceStatus = 'success';
            })
            .addCase(getFavoriteService.rejected, (state, action) => {
                state.getFavoriteServiceStatus = 'error';
                state.getFavoriteServiceError = action.payload || action.error.message
            })

            //get category service
            .addCase(getCategoryService.pending, (state) => {
                state.CategoryServiceStatus = 'loading'
                state.CategoryServiceError = null
            })
            .addCase(getCategoryService.fulfilled, (state, action) => {
                state.CategoryServiceStatus = 'success';
                state.CategoryService = action.payload
            })
            .addCase(getCategoryService.rejected, (state, action) => {
                state.FavoriteServiceStatus = 'error';
                state.FavoriteServiceError = action.payload || action.error.message
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

export const selectReviewService = (state) => state.service.reviewService
export const selectReviewServiceStatus = (state) => state.service.reviewServiceStatus
export const selectReviewServiceError = (state) => state.service.reviewServiceError

export const selectFavoriteService = (state) => state.service.getFavoritesService
export const selectFavoriteServiceStatus = (state) => state.service.getFavoritesServiceStatus
export const selectFavoriteServiceError = (state) => state.service.getFavoritesServiceError

export const selectCategoryService = (state) => state.service.getCategoryService
export const selectCategoryServiceStatus = (state) => state.service.getCategoryServiceStatus
export const selectCategoryServiceError = (state) => state.service.getCategoryServiceError

export const selectAddFavoriteServiceStatus = (state) => state.service.addFavoriteServiceStatus
export const selectAddFavoriteServiceError = (state) => state.service.addFavoriteServiceError

export const selectAllServiceStatus = (state) => state.service.allServiceStatus
export const selectAllServiceError = (state) => state.service.allServiceError

export default serviceSlice.reducer