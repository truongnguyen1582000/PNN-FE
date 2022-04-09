import React, { useEffect, useState } from 'react';
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';

import { useSnackbar } from 'notistack';
import { postApi } from '../../api/post';

function Newfeed(props) {
  const [postList, setPostList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const getPostList = async () => {
    try {
      const { data } = await postApi.getAllPost();
      console.log(data);
      setPostList(data);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  useEffect(() => {
    getPostList();
  }, []);
  return (
    <div>
      <CreatePost getPostList={getPostList} />
      <PostList postList={postList} />
    </div>
  );
}

export default Newfeed;
