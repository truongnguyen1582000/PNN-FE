import axiosClient from './axiosClient';

const createOrder = (data) => {
  const url = '/order';
  return axiosClient.post(url, data);
};

const getMyOrder = () => {
  const url = '/order';
  return axiosClient.get(url);
};

const getShopOrder = () => {
  const url = '/order/shop';
  return axiosClient.get(url);
};

const changeStatus = (id, status) => {
  const url = `/order/${id}`;
  return axiosClient.put(url, { status });
};

const deleteOrder = (id) => {
  const url = `/order/${id}`;
  return axiosClient.delete(url);
};

export const orderApi = {
  createOrder,
  getMyOrder,
  getShopOrder,
  changeStatus,
  deleteOrder,
};
