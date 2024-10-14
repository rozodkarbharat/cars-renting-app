import { configureStore } from "@reduxjs/toolkit";
import authReducer from"./Slices/AuthSlice"
import carReducer from"./Slices/carSlice"



export const store = configureStore({
    reducer:{
        auth:authReducer,
        car:carReducer
    }
})