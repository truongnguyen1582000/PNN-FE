import axiosClient from './axiosClient';

const setLimitMoney = (data) => {
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

const deleteCartItem = (data) => {
  const url = `/cart/${data.productId}`;
  return axiosClient.delete(url);
};

const getShareToken = () => {
  const url = '/cart/shareToken';
  return axiosClient.get(url);
};

export const cartApi = {
  setLimitMoney,
  addToCart,
  getCart,
  deleteCartItem,
  getShareToken,
};
