import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

export const createNewReview = createAsyncThunk(
  "review/create",
  async ({ reviewData, orderId }, { rejectWithValue }) => {
    try {
      // Add this debug line to see if token is being retrieved
      const token = localStorage.getItem("accessToken");
      console.log("Token in reviewSlice:", token ? "exists" : "not found");

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

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    review: null,
    createStatus: "idle",
    createError: null,
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
      });
  },
});

export const { clearCreateStatus } = reviewSlice.actions;

export const selectCreateStatus = (state) => state.review.createStatus;
export const selectCreateError = (state) => state.review.createError;

export default reviewSlice.reducer;
