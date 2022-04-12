import axiosClient from './axiosClient';

const createProduct = (data) => {
  const url = '/products';
  return axiosClient.post(url, data);
};

export const productApi = {
  createProduct,
};
