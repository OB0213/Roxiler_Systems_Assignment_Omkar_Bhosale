import {createSlice} from '@reduxjs/toolkit';

const initialState={
    countMonth:'',
    searchTransaction:'',
}


export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    addMonth: (state,action) => {
      state.countMonth=action.payload;
      console.log(state.countMonth);
    },
    addTransaction: (state,action) => {
      state.searchTransaction=action.payload;
      console.log(state.searchTransaction);
    },
   
  },
});

export const {addMonth,addTransaction}=transactionSlice.actions;

export default transactionSlice.reducer;
