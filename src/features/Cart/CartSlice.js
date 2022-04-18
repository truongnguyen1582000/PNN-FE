import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    list: JSON.parse(localStorage.getItem('cart')) || [],
  },
  reducers: {
    setCart: (state, { payload }) => {
      console.log('run');
      state.list = payload;
      localStorage.setItem('cart', JSON.stringify(payload));
    },
    clearCart: (state) => {
      state.list = [];
      localStorage.removeItem('cart');
    },
  },
});

const { actions, reducer } = cartSlice;
export const { setCart, clearCart } = actions;
export default reducer;
