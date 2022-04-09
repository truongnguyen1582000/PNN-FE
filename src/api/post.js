import axiosClient from './axiosClient';

const createPost = (data) => {
  const url = '/posts';
  return axiosClient.post(url, data);
};

const getAllPost = () => {
  const url = '/posts';
  return axiosClient.get(url);
};

const likePost = (postId) => {
  const url = '/posts/like/' + postId;
  return axiosClient.put(url);
};

const commentPost = (postId, data) => {
  console.log(postId);
  const url = '/posts/' + postId + '/comment';
  return axiosClient.post(url, data);
};

export const postApi = {
  createPost,
  getAllPost,
  likePost,
  commentPost,
};
