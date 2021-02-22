import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
// localStore:
// import storage from 'redux-persist/lib/storage';
// sessionStore:
import storage from 'redux-persist/lib/storage/session';
import loansReducer from '../components/loans/loansSlice';

const rootReducer = combineReducers({
  loans: loansReducer
});

const persistConfig = { key: 'root', storage };
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      // https://github.com/rt2zz/redux-persist/issues/988#issuecomment-552242978
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
})
const persistor = persistStore(store);

export { store, persistor };
