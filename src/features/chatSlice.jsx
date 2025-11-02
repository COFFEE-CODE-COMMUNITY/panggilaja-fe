import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

export const getContactForBuyer = createAsyncThunk(
  'chat/getContactForBuyer',
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/chat/${id}/buyer`)
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Terjadi kesalahan');
    }
  }
);

export const getContactForSeller = createAsyncThunk(
  'chat/getContactForSeller',
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/chat/${id}/seller`)
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Terjadi kesalahan');
    }
  }
);

const initialState = {
  contactBuyerStatus: 'idle',
  contactBuyer: null,
  contactBuyerError: null,

  contactSellerStatus: 'idle',
  contactSeller: null,
  contactSellerError: null,

}

const chat = createSlice({
    name: 'chat',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //get contacy for buyer
            .addCase(getContactForBuyer.pending, (state) => {
                state.contactBuyerStatus = 'loading';
            })
            .addCase(getContactForBuyer.fulfilled, (state, action) => {
                state.contactBuyerStatus = 'success';
                state.contactBuyer = action.payload;
            })
            .addCase(getContactForBuyer.rejected, (state) => {
                state.contactBuyerStatus = 'error';
            })

            //get contacy for seller
            .addCase(getContactForSeller.pending, (state) => {
                state.contactSellerStatus = 'loading';
            })
            .addCase(getContactForSeller.fulfilled, (state, action) => {
                state.contactSellerStatus = 'success';
                state.contactSeller = action.payload;
            })
            .addCase(getContactForSeller.rejected, (state) => {
                state.contactSellerStatus = 'error';
            })

    },
});

export const selectContactSellerStatus = (state) => state.chat.contactSellerStatus
export const selectContactSeller = (state) => state.chat.contactSeller
export const selectContactSellerError = (state) => state.chat.contactSellerError

export const selectContactBuyerStatus = (state) => state.chat.contactBuyerStatus
export const selectContactBuyer = (state) => state.chat.contactBuyer
export const selectContactBuyerError = (state) => state.chat.contactBuyerError



export default chat.reducer;