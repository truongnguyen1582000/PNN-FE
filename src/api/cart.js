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

const getCartByToken = (token) => {
  const url = `/cart/getCartByToken/${token}`;
  return axiosClient.get(url);
};

const getCartById = (cartId) => {
  const url = `/cart/${cartId}`;
  return axiosClient.get(url);
};

const addToCartById = (cartId, data) => {
  const url = `/cart/addToCart/${cartId}/`;
  return axiosClient.post(url, data);
};

export const cartApi = {
  setLimitMoney,
  addToCart,
  getCart,
  deleteCartItem,
  getShareToken,
  getCartByToken,
  getCartById,
  addToCartById,
};
