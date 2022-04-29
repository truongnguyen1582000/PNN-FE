import React, { useEffect, useState } from 'react';

import { useSnackbar } from 'notistack';
import { postApi } from '../../api/post';
import PostList from '../Newfeeds/components/PostList';
import CreatePost from '../Newfeeds/components/CreatePost';

function Rescue(props) {
  const [postList, setPostList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const getPostList = async () => {
    try {
      const { data } = await postApi.getAllRescue();
      setPostList(data);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  useEffect(
    () => {
      getPostList();
    },
    // eslint-disable-next-line
    []
  );

  return (
    <div>
      <CreatePost getPostList={getPostList} mode="rescue" />
      <PostList postList={postList} getPostList={getPostList} mode="rescue" />
    </div>
  );
}

export default Rescue;
