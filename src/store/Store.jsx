import { configureStore } from "@reduxjs/toolkit"
import serviceReducer from '../features/serviceSlice'
import authReducer from '../features/authSlice'

export const store = configureStore({
    reducer : {
        service : serviceReducer,
        auth : authReducer,
    }
})