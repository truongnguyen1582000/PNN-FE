import axiosClient from './axiosClient';

const login = (data) => {
  const url = '/auth/login';
  return axiosClient.post(url, data);
};

const register = (data) => {
  const url = '/auth/register';
  return axiosClient.post(url, data);
};

const updateAvatar = (data) => {
  const url = '/auth/updateAvatar';
  return axiosClient.put(url, data);
};

export const userAPI = {
  login,
  register,
  updateAvatar,
};
