import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

export const getServices = createAsyncThunk(
    'services/getServices',
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get('/services')
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
            const res = await api.get(`/services/${id}`)
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
            const res = await api.get(`/reviews/seller/${id}`)
            return res.data || res.data
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Gagal mengambil review')
        }
    }
)

export const addFavoriteService = createAsyncThunk(
    'services/addFavoriteService',
    async (id, { rejectWithValue }) => {
        try {
            const res = await api.post(`/users/favorites/${id}`)
            return res.data
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Gagal menambah favorit')
        }
    }
)

export const getFavoriteService = createAsyncThunk(
    'services/getFavoriteService',
    async (id, { rejectWithValue }) => {
        try {
            const res = await api.get(`/users/${id}/favorites`)
            return res.data
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Gagal mengambil favorit')
        }
    }
)

export const getCategoryService = createAsyncThunk(
  'services/getCategoryService',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/services/category')
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Terjadi kesalahan');
    }
  }
);

export const addService = createAsyncThunk(
  'services/addService',
  async (data, { rejectWithValue }) => {
    try {
        const res = await api.post('/services', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Terjadi kesalahan');
    }
  }
);

export const editService = createAsyncThunk(
  'services/editService',
  async ({id, data}, { rejectWithValue }) => {
    try {
        const res = await api.put(`/services/${id}`, data);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Terjadi kesalahan');
    }
  }
);

export const deleteService = createAsyncThunk(
  'services/deleteService',
  async (id, { rejectWithValue }) => {
    try {
        const res = await api.delete(`/services/${id}`);
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
        
        addServiceStatus : 'idle',
        addServiceError : null,

        addFavoriteStatus : 'idle',
        addFavoriteError : null,
        
        editServiceStatus : 'idle',
        editServiceError : null,

        deleteServiceStatus : 'idle',
        deleteServiceError : null,
    }),
    reducers : {
        resetEditStatus : (state) => {
            state.editServiceStatus = 'idle'
            state.editServiceError = ''
        },
        resetAddStatus : (state) => {
            state.addServiceStatus = 'idle'
            state.addServiceError = ''
        },
        resetDeleteStatus : (state) => {
            state.deleteServiceStatus = 'idle'
            state.deleteServiceError = ''
        },
    },
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

            //get review by id
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
                state.getFavoritesServiceStatus = 'loading'
                state.getFavoritesServiceError = null
            })
            .addCase(getFavoriteService.fulfilled, (state, action) => {
                state.getFavoritesServiceStatus = 'success';
                state.getFavoritesService = action.payload
            })
            .addCase(getFavoriteService.rejected, (state, action) => {
                state.getFavoritesServiceStatus = 'error';
                state.getFavoritesServiceError = action.payload || action.error.message
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
                state.CategoryServiceStatus = 'error';
                state.CategoryServiceError = action.payload || action.error.message
            })

            //add service
            .addCase(addService.pending, (state) => {
                state.addServiceStatus = 'loading'
                state.addServiceError = null
            })
            .addCase(addService.fulfilled, (state) => {
                state.addServiceStatus = 'success';
            })
            .addCase(addService.rejected, (state, action) => {
                state.addServiceStatus = 'error';
                state.addServiceError = action.payload || action.error.message
            })

            //edit service
            .addCase(editService.pending, (state) => {
                state.editServiceStatus = 'loading'
                state.editServiceError = null
            })
            .addCase(editService.fulfilled, (state) => {
                state.editServiceStatus = 'success';
            })
            .addCase(editService.rejected, (state, action) => {
                state.editServiceStatus = 'error';
                state.editServiceError = action.payload || action.error.message
            })

            //delete service
            .addCase(deleteService.pending, (state) => {
                state.deleteServiceStatus = 'loading'
                state.deleteServiceError = null
            })
            .addCase(deleteService.fulfilled, (state) => {
                state.deleteServiceStatus = 'success';
            })
            .addCase(deleteService.rejected, (state, action) => {
                state.deleteServiceStatus = 'error';
                state.deleteServiceError = action.payload || action.error.message
            })
    }
})

export const {
    selectAll : selectAllService,
    selectById : selectdServiceById
} = serviceEntity.getSelectors(state => state.service)

export const {resetEditStatus, resetDeleteStatus, resetAddStatus} = serviceSlice.actions

export const selectSelectedService = (state) => state.service.selectedService
export const selectSelectedServiceStatus = (state) => state.service.selectedServiceStatus
export const selectSelectedServiceError = (state) => state.service.selectedServiceError

export const selectAddService = (state) => state.service.addService
export const selectAddServiceStatus = (state) => state.service.addServiceStatus
export const selectAddServiceError = (state) => state.service.addServiceError

export const selectReviewService = (state) => state.service.reviewService
export const selectReviewServiceStatus = (state) => state.service.reviewServiceStatus
export const selectReviewServiceError = (state) => state.service.reviewServiceError

export const selectFavoriteService = (state) => state.service.getFavoritesService
export const selectFavoriteServiceStatus = (state) => state.service.getFavoritesServiceStatus
export const selectFavoriteServiceError = (state) => state.service.getFavoritesServiceError

export const selectCategoryService = (state) => state.service.CategoryService
export const selectCategoryServiceStatus = (state) => state.service.CategoryServiceStatus
export const selectCategoryServiceError = (state) => state.service.CategoryServiceError

export const selectAddFavoriteServiceStatus = (state) => state.service.addFavoriteStatus
export const selectAddFavoriteServiceError = (state) => state.service.addFavoriteError

export const selectEditServicesServiceStatus = (state) => state.service.editServiceStatus
export const selectEditServicesServiceError = (state) => state.service.editServiceError

export const selectDeleteServiceStatus = (state) => state.service.deleteServiceStatus
export const selectDeleteServiceError = (state) => state.service.deleteServiceError

export const selectAllServiceStatus = (state) => state.service.allServiceStatus
export const selectAllServiceError = (state) => state.service.allServiceError

export default serviceSlice.reducer