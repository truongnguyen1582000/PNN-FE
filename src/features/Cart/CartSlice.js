import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    list: JSON.parse(localStorage.getItem('cart')) || [],
  },
  reducers: {
    addTocart: (state, { payload }) => {
      const { _id: id, name, price, image } = payload;
      const item = state.list.find((item) => item.id === id);
      if (item) {
        item.count += 1;
      } else {
        state.list.push({
          id,
          name,
          price,
          image,
          count: 1,
        });
      }

      localStorage.setItem('cart', JSON.stringify(state.list));
    },
    removeFromCart: (state, { payload }) => {
      state.list = state.list.filter((item) => item.id !== payload);
    },
    clearCart: (state) => {
      state.list = [];
    },
    saveCart: (state, { payload }) => {
      state.list = payload;
    },
    getCart: (state, { payload }) => {
      state.list = payload;
    },
  },
});

const { actions, reducer } = cartSlice;
export const { addTocart, removeFromCart, clearCart, getCart, saveCart } =
  actions;
export default reducer;
