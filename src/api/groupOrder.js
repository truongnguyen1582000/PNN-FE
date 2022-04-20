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

export const groupOrderAPI = {
  createGO,
  getGO,
  addToGO,
};
