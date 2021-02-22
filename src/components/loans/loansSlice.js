import { createSlice } from '@reduxjs/toolkit';

export const loansSlice = createSlice({
  name: 'loans',
  initialState: {
    list: [
      // sample data:
      // {
      //   creditor: 'Ikanobanken',
      //   amount: 36000,
      //   fee: 50,
      //   apr: 7.54
      // }, {
      //   creditor: 'Brocc',
      //   amount: 150000,
      //   fee: 0,
      //   apr: 5.2
      // }
    ]
  },
  reducers: {
    // accepted payload: { creditor, amount, fee, apr }
    addLoan: (state, action) => {
      // the "+amount" etc is a number typecast, regardless if it's an int or a float,
      // so it's not stored as a string
      state.list.push({
        creditor: action.payload.creditor,
        amount:   +action.payload.amount,
        fee:      +action.payload.fee,
        apr:      +action.payload.apr
      });
    },
    // accepted payload: index (int)
    removeLoan: (state, action) => {
      state.list.splice(action.payload, 1);
    }
  }
});

export const { addLoan, removeLoan } = loansSlice.actions;
export const loansSelector = state => state.loans.list;

export default loansSlice.reducer;
