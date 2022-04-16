import axiosClient from './axiosClient';

const createProduct = (data) => {
  const url = '/products';
  return axiosClient.post(url, data);
};

const getProductList = (data) => {
  const url = '/products';
  return axiosClient.get(url, data);
};

const getMyProduct = () => {
  const url = `/products/myProducts`;
  return axiosClient.get(url);
};

export const productApi = {
  createProduct,
  getProductList,
  getMyProduct,
};
