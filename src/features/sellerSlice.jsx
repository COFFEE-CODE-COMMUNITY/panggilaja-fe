import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

export const getSellers = createAsyncThunk(
  'seller/getSellers',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/sellers')
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Terjadi kesalahan');
    }
  }
);

export const getSellerById = createAsyncThunk(
  'seller/getSellerById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/users/${id}/seller`)
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Terjadi kesalahan');
    }
  }
);

export const addSeller = createAsyncThunk(
  'seller/addSeller',
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post('/sellers', data)
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Terjadi kesalahan');
    }
  }
);

export const getAllServicesByIdSeller = createAsyncThunk(
  'seller/getAllServicesByIdSeller',
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/sellers/${id}/services`)
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Terjadi kesalahan');
    }
  }
);

export const updateSellerById = createAsyncThunk(
  'seller/updateSellerById',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/sellers/${id}`, data)
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Terjadi kesalahan');
    }
  }
);

export const deleteSellerById = createAsyncThunk(
  'seller/deleteSellerById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/sellers/${id}`)
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Terjadi kesalahan');
    }
  }
);

export const getOrderBySellerId = createAsyncThunk(
  'seller/getOrderBySellerId',
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/sellers/${id}/orders`)
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Terjadi kesalahan');
    }
  }
);

const initialState = {
  status: 'idle',
  message: null,
  selectedSeller: null,

  sellerServices: null,
  sellerServicesMessage : '',

  sellerOrders: [],

  statusAdd : 'idle',
  statusDelete : 'idle',
  statusGetServiceSeller : 'idle',

  sellers : null,

  messageDeleteSeller : ''
};

const seller = createSlice({
    name: 'seller',
    initialState,
    reducers: {
      resetSellerStatusDelete : (state) => {
        state.statusDelete = 'idle'
      }
    },
    extraReducers: (builder) => {
        builder
            //get seller
            .addCase(getSellers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getSellers.fulfilled, (state, action) => {
                state.status = 'success';
                state.sellers = action.payload
              })
            .addCase(getSellers.rejected, (state, action) => {
                state.status = 'error';
                state.message = action.payload;
            })

            //get seller by id
            .addCase(getSellerById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getSellerById.fulfilled, (state, action) => {
                state.status = 'success';
                state.message = action.payload
                state.selectedSeller = action.payload;
            })
            .addCase(getSellerById.rejected, (state, action) => {
                state.status = 'error';
                state.message = action.payload
            })

            //add seller
            .addCase(addSeller.pending, (state) => {
                state.statusAdd = 'loading';
            })
            .addCase(addSeller.fulfilled, (state, action) => {
                state.statusAdd = 'success';
                state.message = action.payload;

              })
            .addCase(addSeller.rejected, (state, action) => {
                state.statusAdd = 'error';
                state.message = action.payload;
            })

            //update seller by id
            .addCase(updateSellerById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateSellerById.fulfilled, (state, action) => {
                state.status = 'success';
                state.message = action.payload;
            })
            .addCase(updateSellerById.rejected, (state, action) => {
                state.status = 'error';
                state.message = action.payload;
            })

            //delete seller by id
            .addCase(deleteSellerById.pending, (state) => {
                state.statusDelete = 'loading';
            })
            .addCase(deleteSellerById.fulfilled, (state) => {
                state.statusDelete = 'success';
            })
            .addCase(deleteSellerById.rejected, (state, action) => {
                state.statusDelete = 'error';
                state.messageDeleteSeller = action.payload;
            })

            //get all service by id seller
            .addCase(getAllServicesByIdSeller.pending, (state) => {
                state.statusGetServiceSeller = 'loading';
            })
            .addCase(getAllServicesByIdSeller.fulfilled, (state, action) => {
                state.statusGetServiceSeller = 'success';
                state.sellerServices = action.payload;
            })
            .addCase(getAllServicesByIdSeller.rejected, (state, action) => {
                state.statusGetServiceSeller = 'error';
                console.log(`errorr : `+action.payload)
            })

            //get order by seller id
            .addCase(getOrderBySellerId.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getOrderBySellerId.fulfilled, (state, action) => {
                state.status = 'success';
                state.message = action.payload;
                state.sellerOrders = action.payload;
            })
            .addCase(getOrderBySellerId.rejected, (state, action) => {
                state.status = 'error';
                state.message = action.payload;
            })
    },
});

export const {resetSellerStatusDelete} = seller.actions

export const selectSellers = (state) => state.seller.sellers;
export const selectSelectedSeller = (state) => state.seller.selectedSeller;
export const selectSellerServices = (state) => state.seller.sellerServices;
export const selectSellerOrders = (state) => state.seller.sellerOrders;
export const selectSellerStatus = (state) => state.seller.status;
export const selectAddSellerStatus = (state) => state.seller.statusAdd;
export const selectDeleteSellerStatus = (state) => state.seller.statusDelete;
export const selectServiceSellerStatus = (state) => state.seller.statusGetServiceSeller;
export const selectDeleteSellerMessage = (state) => state.seller.messageDeleteSeller;



export default seller.reducer;