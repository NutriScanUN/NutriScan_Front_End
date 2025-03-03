import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice';
import storeReducer from './storeSlice';
import productsReducer from './productsSlice'


const store = configureStore({
  reducer: {
    auth: authReducer,
    store: storeReducer,
    productsTienda: productsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;