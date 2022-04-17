import axiosClient from './axiosClient';

const setLimiMoney = (data) => {
  const url = '/cart/setLimitMoney';
  return axiosClient.post(url, data);
};

export const cartApi = {
  setLimiMoney,
};
