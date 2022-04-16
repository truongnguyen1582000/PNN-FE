import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    list: JSON.parse(localStorage.getItem('cart')) || [],
  },
  reducers: {
    addTocart: (state, { payload }) => {
      const { list } = state;
      const item = list.find((item) => item._id === payload._id);
      if (item) {
        item.count += 1;
      } else {
        list.push({
          ...payload,
          count: 1,
        });
      }
      localStorage.setItem('cart', JSON.stringify(list));
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
    addMore: (state, { payload }) => {
      const index = state.list.findIndex((item) => item._id === payload._id);
      state.list[index].count += 1;
      localStorage.setItem('cart', JSON.stringify(state.list));
    },
    descreaseItem: (state, { payload }) => {
      const index = state.list.findIndex((item) => item._id === payload._id);
      state.list[index].count -= 1;
      if (state.list[index].count === 0) {
        state.list.splice(index, 1);
      }
      localStorage.setItem('cart', JSON.stringify(state.list));
    },
  },
});

const { actions, reducer } = cartSlice;
export const {
  addTocart,
  removeFromCart,
  clearCart,
  getCart,
  saveCart,
  addMore,
  descreaseItem,
} = actions;
export default reducer;
