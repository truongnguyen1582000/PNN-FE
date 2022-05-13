import axiosClient from './axiosClient';

const createAddress = (data) => {
  const url = '/address/create';
  return axiosClient.post(url, data);
};

const getAddress = () => {
  const url = '/address/getAll';
  return axiosClient.get(url);
};

const deleteAddress = (id) => {
  const url = `/address/${id}`;
  return axiosClient.delete(url);
};

export const addressAPI = { createAddress, getAddress, deleteAddress };
