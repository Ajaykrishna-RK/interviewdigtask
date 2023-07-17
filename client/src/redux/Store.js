import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice.js"


export const store = configureStore({
    reducer:{
Userss:userReducer
    }
})