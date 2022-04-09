import axiosClient from './axiosClient';

const createPost = (data) => {
  const url = '/posts';
  return axiosClient.post(url, data);
};

const getAllPost = () => {
  const url = '/posts';
  return axiosClient.get(url);
};

export const postApi = {
  createPost,
  getAllPost,
};
