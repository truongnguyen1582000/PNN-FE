import axiosClient from './axiosClient';

const getAll = () => {
  const url = '/users/bookmarks';
  return axiosClient.get(url);
};

const addToBookmark = (postId) => {
  const url = '/users/bookmarks/' + postId;
  return axiosClient.put(url);
};

const getUserInfo = (id) => {
  const url = '/users/' + id;
  return axiosClient.get(url);
};

export const bookmarkAPI = {
  getAll,
  addToBookmark,
  getUserInfo,
};
