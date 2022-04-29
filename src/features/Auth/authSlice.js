import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem('USER')) || {},
    setting: {},
  },
  reducers: {
    logout: (state, payload) => {
      state.current = {};
      localStorage.removeItem('USER');
      localStorage.removeItem('TOKEN');
    },
    login: (state, { payload }) => {
      state.current = payload.userInfo;
      localStorage.setItem('USER', JSON.stringify(payload.userInfo));
      localStorage.setItem('TOKEN', payload.token);
    },
    changeAvatar: (state, { payload }) => {
      state.current.avatar = payload;
      localStorage.setItem('USER', JSON.stringify(state.current));
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout, login, changeAvatar } = actions;
export default reducer;
