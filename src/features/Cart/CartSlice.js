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
  },
});

const { actions, reducer } = cartSlice;
export const { setCart } = actions;
export default reducer;
