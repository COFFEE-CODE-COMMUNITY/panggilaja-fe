import { configureStore } from "@reduxjs/toolkit"
import serviceReducer from '../features/serviceSlice'

export const store = configureStore({
    reducer : {
        service : serviceReducer
    }
})