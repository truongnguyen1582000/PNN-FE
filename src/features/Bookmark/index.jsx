import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { bookmarkAPI } from '../../api/user';
import PostList from '../Newfeeds/components/PostList';

function Bookmark(props) {
  const [postList, setPostList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const getPostList = async () => {
    try {
      const { data } = await bookmarkAPI.getAll();
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
    <div className="box large-size">
      {postList.length > 0 ? (
        <PostList postList={postList} getPostList={getPostList} />
      ) : (
        <div className="text-center">
          <h3
            style={{
              textAlign: 'center',
            }}
          >
            No bookmark yet !
          </h3>
        </div>
      )}
    </div>
  );
}

export default Bookmark;
