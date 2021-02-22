import { configureStore } from '@reduxjs/toolkit';
import loansReducer from '../components/loans/loansSlice';

export default configureStore({
  reducer: {
    loans: loansReducer
  }
});
