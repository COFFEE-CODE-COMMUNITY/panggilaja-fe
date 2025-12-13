import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

export const createOrder = createAsyncThunk(
  "order/create",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await api.post("/orders", orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to create order" }
      );
    }
  }
);

export const getOrderById = createAsyncThunk(
  "order/getById",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getBuyerOrders = createAsyncThunk(
  "order/getBuyerOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/orders/buyer");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getSellerOrders = createAsyncThunk(
  "order/getSellerOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/orders/seller/list");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "order/updateStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/orders/${orderId}/status`, { status });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "order/delete",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    currentOrder: null,
    buyerOrders: [],
    sellerOrders: [],
    status: "idle",
    error: null,
    createStatus: "idle",
    createError: null,

    updateOrderStatus: "idle",
    updateOrderError: "idle",
  },
  reducers: {
    clearOrderStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
    clearCreateStatus: (state) => {
      state.createStatus = "idle";
      state.createError = null;
    },
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.createStatus = "success";
        state.currentOrder = action.payload.data;
        state.createError = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload?.message || "Failed to create order";
      })

      .addCase(getOrderById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.status = "success";
        state.currentOrder = action.payload.data;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Failed to fetch order";
      })

      .addCase(getBuyerOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBuyerOrders.fulfilled, (state, action) => {
        state.status = "success";
        state.buyerOrders = action.payload.data || [];
      })
      .addCase(getBuyerOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Failed to fetch orders";
      })

      .addCase(getSellerOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSellerOrders.fulfilled, (state, action) => {
        state.status = "success";
        state.sellerOrders = action.payload.data || [];
      })
      .addCase(getSellerOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Failed to fetch orders";
      })

      .addCase(updateOrderStatus.pending, (state, action) => {
        // state.currentOrder = action.payload.data;
        // // Update order di list juga
        // const updatedOrder = action.payload.data;
        // state.buyerOrders = state.buyerOrders.map((order) =>
        //   order.id === updatedOrder.id ? updatedOrder : order
        // );
        // state.sellerOrders = state.sellerOrders.map((order) =>
        //   order.id === updatedOrder.id ? updatedOrder : order
        // );
        state.updateOrderStatus = "loading";
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        // state.currentOrder = action.payload.data;
        // // Update order di list juga
        // const updatedOrder = action.payload.data;
        // state.buyerOrders = state.buyerOrders.map((order) =>
        //   order.id === updatedOrder.id ? updatedOrder : order
        // );
        // state.sellerOrders = state.sellerOrders.map((order) =>
        //   order.id === updatedOrder.id ? updatedOrder : order
        // );
        state.updateOrderStatus = "success";
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        // state.currentOrder = action.payload.data;
        // // Update order di list juga
        // const updatedOrder = action.payload.data;
        // state.buyerOrders = state.buyerOrders.map((order) =>
        //   order.id === updatedOrder.id ? updatedOrder : order
        // );
        // state.sellerOrders = state.sellerOrders.map((order) =>
        //   order.id === updatedOrder.id ? updatedOrder : order
        // );
        state.updateOrderStatus = "error";
      })

      .addCase(deleteOrder.fulfilled, (state, action) => {
        const deletedId = action.meta.arg;
        state.buyerOrders = state.buyerOrders.filter(
          (order) => order.id !== deletedId
        );
        state.sellerOrders = state.sellerOrders.filter(
          (order) => order.id !== deletedId
        );
        if (state.currentOrder?.id === deletedId) {
          state.currentOrder = null;
        }
      });
  },
});

export const {
  clearOrderStatus,
  clearCreateStatus,
  setCurrentOrder,
  clearCurrentOrder,
} = orderSlice.actions;

export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectBuyerOrders = (state) => state.order.buyerOrders;
export const selectSellerOrders = (state) => state.order.sellerOrders;
export const selectOrderStatus = (state) => state.order.status;
export const selectOrderError = (state) => state.order.error;
export const selectCreateStatus = (state) => state.order.createStatus;
export const selectCreateError = (state) => state.order.createError;

export const selectUpdateOrderError = (state) =>
  state.order.updateOrderStatusError;
export const selectUpdateOrderStatus = (state) => state.order.updateOrderStatus;

export default orderSlice.reducer;
