import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/Auth/authSlice';
import cartReducer from '../features/Cart/CartSlice';
import GOcartReducer from '../features/GroupOrder/GroupOrderSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    GOcart: GOcartReducer,
  },
});
