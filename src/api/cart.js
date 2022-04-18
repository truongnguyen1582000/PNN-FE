import axiosClient from './axiosClient';

const setLimiMoney = (data) => {
  const url = '/cart/setLimitMoney';
  return axiosClient.post(url, data);
};

const addToCart = (data) => {
  const url = '/cart/addToCart';
  return axiosClient.post(url, data);
};

const getCart = (data) => {
  const url = '/cart';
  return axiosClient.get(url, data);
};

export const cartApi = {
  setLimiMoney,
  addToCart,
  getCart,
};
