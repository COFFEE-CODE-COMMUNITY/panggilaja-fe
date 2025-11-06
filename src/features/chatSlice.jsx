import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";
import { logoutUser, changeAccount } from "../features/authSlice";

// 🔹 Buyer contact
export const getContactForBuyer = createAsyncThunk(
  "chat/getContactForBuyer",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/chat/${id}/buyer`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          "Terjadi kesalahan saat memuat kontak pembeli"
      );
    }
  }
);

// 🔹 Seller contact
export const getContactForSeller = createAsyncThunk(
  "chat/getContactForSeller",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/chat/${id}/seller`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          "Terjadi kesalahan saat memuat kontak penjual"
      );
    }
  }
);

const initialState = {
  // buyer
  contactBuyer: null,
  contactBuyerStatus: "idle",
  contactBuyerError: null,
  // seller
  contactSeller: null,
  contactSellerStatus: "idle",
  contactSellerError: null,
};

const chat = createSlice({
  name: "chat",
  initialState,
  reducers: {
    updateLastMessage: (state, action) => {
      const { partnerId, text, time } = action.payload;
      const listKey = state.contactBuyer ? "contactBuyer" : "contactSeller";

      if (state[listKey]) {
        const conversations = [...state[listKey]];
        const chatIndex = conversations.findIndex((c) => c.id === partnerId);

        if (chatIndex > -1) {
          const chatToUpdate = conversations[chatIndex];
          const updatedChat = {
            ...chatToUpdate,
            lastMessage: {
              text: text,
              created_at: time,
            },
          };

          conversations.splice(chatIndex, 1);

          state[listKey] = [updatedChat, ...conversations];
        }
      }
    },
    resetChat: (state) => {
      state.contactBuyer = null;
      state.contactBuyerStatus = "idle";
      state.contactBuyerError = null;
      state.contactSeller = null;
      state.contactSellerStatus = "idle";
      state.contactSellerError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Buyer
      .addCase(getContactForBuyer.pending, (state) => {
        state.contactBuyerStatus = "loading";
      })
      .addCase(getContactForBuyer.fulfilled, (state, action) => {
        state.contactBuyerStatus = "success";
        state.contactBuyer = action.payload.data.map((contact) => ({
          ...contact,
          name: contact.nama_toko,
          avatar: contact.foto_toko,
        }));
      })
      .addCase(getContactForBuyer.rejected, (state, action) => {
        state.contactBuyerStatus = "error";
        state.contactBuyerError = action.payload.data;
      })

      // Seller
      .addCase(getContactForSeller.pending, (state) => {
        state.contactSellerStatus = "loading";
      })
      .addCase(getContactForSeller.fulfilled, (state, action) => {
        state.contactSellerStatus = "success";
        state.contactSeller = action.payload.data.map((contact) => ({
          ...contact,
          name: contact.nama,
          avatar: contact.foto_profile,
        }));
      })
      .addCase(getContactForSeller.rejected, (state, action) => {
        state.contactSellerStatus = "error";
        state.contactSellerError = action.payload.data;
      })
      // Logout Success
      .addCase(logoutUser.fulfilled, (state) => {
        console.log("LOGOUT terdeteksi, membersihkan state chat...");
        state.contactBuyer = null;
        state.contactBuyerStatus = "idle";
        state.contactBuyerError = null;
        state.contactSeller = null;
        state.contactSellerStatus = "idle";
        state.contactSellerError = null;
      })
      // Switch Account Success
      .addCase(changeAccount.fulfilled, (state) => {
        console.log("CHANGE ACCOUNT terdeteksi, membersihkan state chat...");
        state.contactBuyer = null;
        state.contactBuyerStatus = "idle";
        state.contactBuyerError = null;
        state.contactSeller = null;
        state.contactSellerStatus = "idle";
        state.contactSellerError = null;
      })
      .addCase("auth/logout", (state) => {
        console.log("LOGOUT SINKRON terdeteksi, membersihkan state chat...");
        state.contactBuyer = null;
        state.contactBuyerStatus = "idle";
        state.contactBuyerError = null;
        state.contactSeller = null;
        state.contactSellerStatus = "idle";
        state.contactSellerError = null;
      });
  },
});

export const selectContactSellerStatus = (state) =>
  state.chat.contactSellerStatus;
export const selectContactSeller = (state) => state.chat.contactSeller;
export const selectContactSellerError = (state) =>
  state.chat.contactSellerError;

export const selectContactBuyerStatus = (state) =>
  state.chat.contactBuyerStatus;
export const selectContactBuyer = (state) => state.chat.contactBuyer;
export const selectContactBuyerError = (state) => state.chat.contactBuyerError;
export const { updateLastMessage, resetChat } = chat.actions;

export default chat.reducer;
