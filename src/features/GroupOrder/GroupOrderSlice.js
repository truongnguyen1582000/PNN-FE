import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { groupOrderAPI } from '../../api/groupOrder';

export const getGroupOrderCart = createAsyncThunk(
  'GOcart/getGroupOrderCart',
  async () => {
    const response = await groupOrderAPI.getGO();

    return response.data;
  }
);

const cartSlice = createSlice({
  name: 'GOcart',
  initialState: {
    list: JSON.parse(localStorage.getItem('GOcart')) || [],
  },
  reducers: {},
  extraReducers: {
    [getGroupOrderCart.fulfilled]: (state, { payload }) => {
      state.list = payload;
      localStorage.setItem('GOcart', JSON.stringify(payload));
    },
  },
});

const { actions, reducer } = cartSlice;
export const {} = actions;
export default reducer;
