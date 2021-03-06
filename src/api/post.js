import axiosClient from './axiosClient';

const createPost = (data) => {
  const url = '/posts';
  return axiosClient.post(url, data);
};

const getAllPost = () => {
  const url = '/posts/Post';
  return axiosClient.get(url);
};

const likePost = (postId) => {
  const url = '/posts/like/' + postId;
  return axiosClient.put(url);
};

const commentPost = (postId, data) => {
  const url = '/posts/' + postId + '/comment';
  return axiosClient.post(url, data);
};

const addToBookmark = (postId) => {
  const url = '/posts/bookmark/' + postId;
  return axiosClient.put(url);
};

const deletePost = (postId) => {
  const url = '/posts/' + postId;
  return axiosClient.delete(url);
};

const getMyPost = () => {
  const url = '/posts/my-post';
  return axiosClient.get(url);
};

const getPostOfUser = (id) => {
  const url = '/posts/user/' + id;
  return axiosClient.get(url);
};

const getAllRescue = () => {
  const url = '/posts/Rescue';
  return axiosClient.get(url);
};

const setStatus = (postId) => {
  const url = '/posts/status/' + postId;
  return axiosClient.put(url);
};

export const postApi = {
  createPost,
  getAllPost,
  likePost,
  commentPost,
  addToBookmark,
  deletePost,
  getMyPost,
  getAllRescue,
  setStatus,
  getPostOfUser,
};
