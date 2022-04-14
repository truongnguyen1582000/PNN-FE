import axiosClient from './axiosClient';

const createProduct = (data) => {
  const url = '/products';
  return axiosClient.post(url, data);
};

const getProductList = (data) => {
  const url = '/products';
  return axiosClient.get(url, data);
};

export const productApi = {
  createProduct,
  getProductList,
};
