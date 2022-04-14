import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/Auth/authSlice';
import cartReducer from '../features/Cart/CartSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});
