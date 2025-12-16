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
  // Global online state (Key: "role_userId")
  onlineUsers: {},
};

const chat = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // 🔹 Update last message (existing)
    updateLastMessage: (state, action) => {
      const { partnerId, text, time } = action.payload;
      const listKey = state.contactBuyer ? "contactBuyer" : "contactSeller";

      if (state[listKey]) {
        const conversations = [...state[listKey]];
        const chatIndex = conversations.findIndex((c) => String(c.id).trim() === String(partnerId).trim());

        if (chatIndex > -1) {
          const chatToUpdate = conversations[chatIndex];
          const updatedChat = {
            ...chatToUpdate,
            lastMessage: {
              text: text,
              created_at: time,
            },
          };

          // Pindahkan ke atas
          conversations.splice(chatIndex, 1);
          state[listKey] = [updatedChat, ...conversations];
        }
      }
    },

    // 🆕 Add new contact (untuk kontak baru pertama kali)
    addNewContact: (state, action) => {
      const { contact, isBuyer } = action.payload;
      const listKey = isBuyer ? "contactBuyer" : "contactSeller";

      if (state[listKey]) {
        // Cek apakah kontak sudah ada
        const exists = state[listKey].some((c) => String(c.id).trim() === String(contact.id).trim());
        if (!exists) {
          // Check online status from state
          const targetRole = isBuyer ? 'seller' : 'buyer';
          const userKey = `${targetRole}_${contact.id}`;
          const isOnline = !!state.onlineUsers[userKey];

          // Tambahkan kontak baru di posisi paling atas
          state[listKey] = [{ ...contact, isOnline }, ...state[listKey]];
          console.log(`✅ New contact added: ${contact.name}`);
        }
      }
    },

    // 🆕 Update contact dari socket notification
    updateContactFromSocket: (state, action) => {
      const { partnerId, lastMessage, isBuyer, isMyMessage } = action.payload;
      const listKey = isBuyer ? "contactBuyer" : "contactSeller";

      if (state[listKey]) {
        const conversations = [...state[listKey]];

        // Cari index kontak yang tepat berdasarkan partnerId
        const chatIndex = conversations.findIndex((c) => String(c.id).trim() === String(partnerId).trim());

        if (chatIndex > -1) {
          // ✅ Update HANYA kontak yang sesuai partnerId
          const chatToUpdate = conversations[chatIndex];

          // Buat objek kontak yang diupdate
          const updatedChat = {
            ...chatToUpdate,
            lastMessage: {
              text: lastMessage.text,
              created_at: lastMessage.created_at,
            },
            // ✅ Increment unread count ONLY if it's NOT my message
            unreadCount: isMyMessage
              ? (chatToUpdate.unreadCount || 0)
              : (chatToUpdate.unreadCount || 0) + 1,
          };

          // Hapus dari posisi lama
          conversations.splice(chatIndex, 1);

          // Tambahkan di posisi paling atas
          state[listKey] = [updatedChat, ...conversations];

          console.log(
            `✅ Contact updated via socket: ${partnerId}`,
            updatedChat
          );
        }
      }
    },

    // 🆕 Mark chat as read
    markChatAsRead: (state, action) => {
      const { partnerId, isBuyer } = action.payload;
      const listKey = isBuyer ? "contactBuyer" : "contactSeller";

      if (state[listKey]) {
        const conversations = state[listKey];
        // Use String() and trim() for comparison to handle number vs string and whitespace issues
        const chatIndex = conversations.findIndex((c) => String(c.id).trim() === String(partnerId).trim());

        if (chatIndex > -1) {
          // Mutate directly as Immer allows it, but let's be safe slightly
          state[listKey][chatIndex].unreadCount = 0;
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
      state.onlineUsers = {};
    },

    // 🆕 Update User Online Status
    updateUserStatus: (state, action) => {
      const { userId, role, isOnline } = action.payload;
      const normalizedRole = role?.toLowerCase();
      const userKey = `${normalizedRole}_${userId}`;

      // Update global map
      if (isOnline) {
        state.onlineUsers[userKey] = true;
      } else {
        delete state.onlineUsers[userKey];
      }

      // Update in Buyer Contacts (List of Sellers)
      if (state.contactBuyer && normalizedRole === 'seller') {
        const index = state.contactBuyer.findIndex(c => String(c.id) === String(userId));
        if (index !== -1) {
          state.contactBuyer[index] = { ...state.contactBuyer[index], isOnline };
        }
      }

      // Update in Seller Contacts (List of Buyers)
      if (state.contactSeller && normalizedRole === 'buyer') {
        const index = state.contactSeller.findIndex(c => String(c.id) === String(userId));
        if (index !== -1) {
          state.contactSeller[index] = { ...state.contactSeller[index], isOnline };
        }
      }
    },

    // 🆕 Bulk Set Online Users (Sync Init State)
    setOnlineUsers: (state, action) => {
      const onlineList = action.payload; // Array of { userId, role }

      // Rebuild global map
      state.onlineUsers = {};
      const onlineSellers = new Set();
      const onlineBuyers = new Set();

      onlineList.forEach(u => {
        const role = u.role?.toLowerCase();
        const key = `${role}_${u.userId}`;
        state.onlineUsers[key] = true;

        if (role === 'seller') onlineSellers.add(String(u.userId));
        if (role === 'buyer') onlineBuyers.add(String(u.userId));
      });

      // Update Buyer Contacts (Match with Sellers)
      if (state.contactBuyer) {
        state.contactBuyer = state.contactBuyer.map(c => ({
          ...c,
          isOnline: onlineSellers.has(String(c.id))
        }));
      }

      // Update Seller Contacts (Match with Buyers)
      if (state.contactSeller) {
        state.contactSeller = state.contactSeller.map(c => ({
          ...c,
          isOnline: onlineBuyers.has(String(c.id))
        }));
      }
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
        state.contactBuyer = action.payload.data.map((contact) => {
          const userKey = `seller_${contact.id}`;
          return {
            ...contact,
            name: contact.nama_toko,
            avatar: contact.foto_toko,
            isOnline: !!state.onlineUsers[userKey],
          };
        });
      })
      .addCase(getContactForBuyer.rejected, (state, action) => {
        state.contactBuyerStatus = "error";
        state.contactBuyerError = action.payload;
      })

      // Seller
      .addCase(getContactForSeller.pending, (state) => {
        state.contactSellerStatus = "loading";
      })
      .addCase(getContactForSeller.fulfilled, (state, action) => {
        state.contactSellerStatus = "success";
        state.contactSeller = action.payload.data.map((contact) => {
          const userKey = `buyer_${contact.id}`;
          return {
            ...contact,
            name: contact.nama,
            avatar: contact.foto_profile,
            isOnline: !!state.onlineUsers[userKey],
          };
        });
      })
      .addCase(getContactForSeller.rejected, (state, action) => {
        state.contactSellerStatus = "error";
        state.contactSellerError = action.payload;
      })

      // Logout & Switch Account
      .addCase(logoutUser.fulfilled, (state) => {
        console.log("LOGOUT terdeteksi, membersihkan state chat...");
        state.contactBuyer = null;
        state.contactBuyerStatus = "idle";
        state.contactBuyerError = null;
        state.contactSeller = null;
        state.contactSellerStatus = "idle";
        state.contactSellerError = null;
      })
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

// Selectors
export const selectContactSellerStatus = (state) =>
  state.chat.contactSellerStatus;
export const selectContactSeller = (state) => state.chat.contactSeller;
export const selectContactSellerError = (state) =>
  state.chat.contactSellerError;

export const selectContactBuyerStatus = (state) =>
  state.chat.contactBuyerStatus;
export const selectContactBuyer = (state) => state.chat.contactBuyer;
export const selectContactBuyerError = (state) => state.chat.contactBuyerError;

// Actions
export const {
  updateLastMessage,
  addNewContact,
  updateContactFromSocket,
  markChatAsRead,
  resetChat,
  updateUserStatus,
  setOnlineUsers
} = chat.actions;

export default chat.reducer;
