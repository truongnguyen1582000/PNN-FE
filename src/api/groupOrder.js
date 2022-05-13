import axiosClient from './axiosClient';

const createGO = (data) => {
  const url = '/group-order';
  return axiosClient.post(url, data);
};

const getGO = (data) => {
  const url = '/group-order';
  return axiosClient.get(url, data);
};

const addToGO = (id, data) => {
  const url = '/group-order/add/' + id;
  return axiosClient.post(url, data);
};

const getToken = (id) => {
  const url = '/group-order/shareToken/' + id;
  return axiosClient.get(url);
};

const setLimitMoney = (data) => {
  const url = '/group-order/setLimitMoney/';
  return axiosClient.post(url, data);
};

const delelteGO = (id) => {
  const url = '/group-order/' + id;
  return axiosClient.delete(url);
};

const deleteItemFromGO = (cartId, productId) => {
  const url = '/group-order/' + cartId + '/' + productId;
  return axiosClient.delete(url);
};

const addMoreItemToGO = (cartId, productId, data) => {
  const url = '/group-order/addMoreItem/' + cartId + '/' + productId;
  return axiosClient.post(url, data);
};

const getGroupOrderByToken = (token) => {
  const url = '/group-order/getGroupOrder/' + token;
  return axiosClient.get(url);
};

const leaveGO = (GOCartId) => {
  const url = '/group-order/leave/' + GOCartId;
  return axiosClient.delete(url);
};

const changeShareStatus = (GOCartId) => {
  GOCartId;
  const url = '/group-order/changeShareStatus/' + GOCartId;
  return axiosClient.put(url);
};

export const groupOrderAPI = {
  createGO,
  getGO,
  addToGO,
  getToken,
  setLimitMoney,
  delelteGO,
  deleteItemFromGO,
  addMoreItemToGO,
  getGroupOrderByToken,
  leaveGO,
  changeShareStatus,
};
