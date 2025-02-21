import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from './Redux/sliceData.js';

export const store=configureStore({
    reducer:{
        transaction:transactionReducer
    }
})