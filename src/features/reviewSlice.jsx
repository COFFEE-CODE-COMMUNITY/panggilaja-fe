import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

export const createNewReview = createAsyncThunk(
  "review/create",
  async ({ reviewData, orderId }, { rejectWithValue }) => {
    try {
      // Add this debug line to see if token is being retrieved
      const token = localStorage.getItem("accessToken");


      const res = await api.post(`/review/service/${orderId}`, reviewData);
      return res.data;
    } catch (error) {
      console.error("Review creation error:", error.response?.data);
      return rejectWithValue(
        error.response?.data || { message: "Failed to create review" }
      );
    }
  }
);

export const getReviewsBySellerId = createAsyncThunk(
  "review/getReviewsBySellerId",
  async (sellerId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/review/seller/${sellerId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch seller reviews" }
      );
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    review: null,
    createStatus: "idle",
    createError: null,

    sellerReviews: [],
    sellerReviewsStatus: "idle",
    sellerReviewsError: null,
  },

  reducers: {
    clearCreateStatus: (state) => {
      state.createStatus = "idle";
      state.createError = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createNewReview.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createNewReview.fulfilled, (state, action) => {
        state.createStatus = "success";
        state.review = action.payload;
        state.createError = null;
      })
      .addCase(createNewReview.rejected, (state, action) => {
        state.createStatus = "error";
        state.createError =
          action.payload?.message || "failed to create review";
      })

      // Get Reviews By Seller
      .addCase(getReviewsBySellerId.pending, (state) => {
        state.sellerReviewsStatus = "loading";
        state.sellerReviewsError = null;
      })
      .addCase(getReviewsBySellerId.fulfilled, (state, action) => {
        state.sellerReviewsStatus = "success";
        state.sellerReviews = action.payload.data; // Assuming response has data property
        state.sellerReviewsError = null;
      })
      .addCase(getReviewsBySellerId.rejected, (state, action) => {
        state.sellerReviewsStatus = "error";
        state.sellerReviewsError =
          action.payload?.message || "failed to fetch seller reviews";
      });
  },
});

export const { clearCreateStatus } = reviewSlice.actions;

export const selectCreateStatus = (state) => state.review.createStatus;
export const selectCreateError = (state) => state.review.createError;

export const selectSellerReviews = (state) => state.review.sellerReviews;
export const selectSellerReviewsStatus = (state) => state.review.sellerReviewsStatus;
export const selectSellerReviewsError = (state) => state.review.sellerReviewsError;

export default reviewSlice.reducer;
