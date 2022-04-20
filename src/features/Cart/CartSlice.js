import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { cartApi } from '../../api/cart';

export const getCart = createAsyncThunk('cart/getCart', async () => {
  const response = await cartApi.getCart();
  localStorage.setItem('cartId', response?.data?._id);
  return response.data.cartItems;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    list: JSON.parse(localStorage.getItem('cart')) || [],
  },
  reducers: {
    setCart: (state, { payload }) => {
      state.list = payload;
      localStorage.setItem('cart', JSON.stringify(payload));
    },
    clearCart: (state) => {
      state.list = [];
      localStorage.removeItem('cart');
    },
  },
  extraReducers: {
    [getCart.fulfilled]: (state, { payload }) => {
      state.list = payload;
      localStorage.setItem('cart', JSON.stringify(payload));
    },
  },
});

const { actions, reducer } = cartSlice;
export const { setCart, clearCart } = actions;
export default reducer;
