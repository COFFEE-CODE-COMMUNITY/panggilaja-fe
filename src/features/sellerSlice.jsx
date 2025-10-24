import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../api/api";

const url = 'http://localhost:5000/api';

export const getSellers = createAsyncThunk(
  'seller/getSellers',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(url + '/sellers', {
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

export const getSellerById = createAsyncThunk(
  'seller/getSellerById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(url + `/users/${id}/seller`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }, { withCredentials: true });
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
      const res = await api.post(url + '/sellers', data, {
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

export const getAllServicesByIdSeller = createAsyncThunk(
  'seller/getAllServicesByIdSeller',
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(url + '/sellers/' + id + '/services', {
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

export const updateSellerById = createAsyncThunk(
  'seller/updateSellerById',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(url + '/sellers/' + id, data, {
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

export const deleteSellerById = createAsyncThunk(
  'seller/deleteSellerById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.delete(url + '/sellers/' + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }, { withCredentials: true });
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Terjadi kesalahan');
    }
  }
);

export const getOrderBySellerId = createAsyncThunk(
  'seller/getOrderBySellerId',
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(url + '/sellers/' + id + '/orders', {
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

export const getCategory = createAsyncThunk(
  'seller/getCategory',
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(url + '/sellers/' + id + '/orders', {
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

const sellerEntity = createEntityAdapter({
  selectId: (seller) => seller.id,
});

const initialState = sellerEntity.getInitialState({
  status: 'idle',
  message: null,
  selectedSeller: null,
  sellerServices: [],
  sellerOrders: [],
});

const seller = createSlice({
    name: 'seller',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //get seller
            .addCase(getSellers.pending, (state) => {
                state.status = true;
            })
            .addCase(getSellers.fulfilled, (state, action) => {
                state.status = 'success';
                state.message = action.payload;
                sellerEntity.setAll(state, action.payload);
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
                state.status = 'loading';
            })
            .addCase(addSeller.fulfilled, (state, action) => {
                state.status = 'success';
                state.message = action.payload;
                sellerEntity.addOne(state, action.payload);
            })
            .addCase(addSeller.rejected, (state, action) => {
                state.status = 'error';
                state.message = action.payload;
            })

            //update seller by id
            .addCase(updateSellerById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateSellerById.fulfilled, (state, action) => {
                state.status = 'success';
                state.message = action.payload;
                sellerEntity.upsertOne(state, action.payload);
            })
            .addCase(updateSellerById.rejected, (state, action) => {
                state.status = 'error';
                state.message = action.payload;
            })

            //delete seller by id
            .addCase(deleteSellerById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteSellerById.fulfilled, (state, action) => {
                state.status = 'success';
                state.message = action.payload;
                sellerEntity.removeOne(state, action.payload);
            })
            .addCase(deleteSellerById.rejected, (state, action) => {
                state.status = 'error';
                state.message = action.payload;
            })

            //get all service by id seller
            .addCase(getAllServicesByIdSeller.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllServicesByIdSeller.fulfilled, (state, action) => {
                state.status = 'success';
                state.message = action.payload;
                state.sellerServices = action.payload;
            })
            .addCase(getAllServicesByIdSeller.rejected, (state, action) => {
                state.status = 'error';
                state.message = action.payload;
            })

            //get order by seller id
            .addCase(getOrderBySellerId.pending, (state, action) => {
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

export const {
  selectAll: selectAllSellers,
  selectById: selectSellerById,
  selectIds: selectSellerIds,
} = sellerEntity.getSelectors((state) => state.seller);

export const selectSelectedSeller = (state) => state.seller.selectedSeller;
export const selectSellerServices = (state) => state.seller.sellerServices;
export const selectSellerOrders = (state) => state.seller.sellerOrders;
export const selectSellerStatus = (state) => state.seller.status;

export default seller.reducer;
