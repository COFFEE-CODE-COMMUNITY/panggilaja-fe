import { configureStore } from "@reduxjs/toolkit";
import serviceReducer from "../features/serviceSlice";
import authReducer from "../features/authSlice";
import searchReducer from "../features/searchSlice";
import sellerReducer from "../features/sellerSlice";
import userReducer from "../features/userSlice";
import chatReducer from "../features/chatSlice";
import alamatReducer from "../features/addressSlice";
import orderReducer from "../features/orderSlice";
import reviewReducer from "../features/reviewSlice";

export const store = configureStore({
  reducer: {
    service: serviceReducer,
    auth: authReducer,
    search: searchReducer,
    seller: sellerReducer,
    user: userReducer,
    chat: chatReducer,
    alamat: alamatReducer,
    order: orderReducer,
    review: reviewReducer,
  },
});
