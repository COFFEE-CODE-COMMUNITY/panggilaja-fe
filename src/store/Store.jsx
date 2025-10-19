import { configureStore } from "@reduxjs/toolkit"
import serviceReducer from '../features/serviceSlice'
import authReducer from '../features/authSlice'
import searchReducer from '../features/searchSlice'

export const store = configureStore({
    reducer : {
        service : serviceReducer,
        auth : authReducer,
        search : searchReducer,
    }
})