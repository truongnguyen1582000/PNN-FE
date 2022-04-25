import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { postApi } from '../../api/post';
import coverImage from '../../assets/imgs/cover.98ab1b0a.webp';
import PostList from '../Newfeeds/components/PostList';

function Account(props) {
  const currentUser = JSON.parse(localStorage.getItem('USER'));
  const [postList, setPostList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const getPostList = async () => {
    try {
      const { data } = await postApi.getMyPost();
      console.log(data);

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
      <div className="box my-profile">
        <div className="cover-image">
          <img
            src={coverImage}
            className="cover-img"
            width={968}
            height={107}
            alt=""
          />
        </div>
        <div className="profile-bottom">
          <img src={currentUser.avatar} alt="" className="profile-avatar" />
          <div className="more-info">
            <p className="profile-name">{currentUser.username}</p>
            <span className="quote">
              Dogs and angels are not very far apart. - Charles Bukowski, German
              American Writer
            </span>
          </div>
        </div>
      </div>
      <div className="box">
        {postList.length > 0 ? (
          <PostList postList={postList} getPostList={getPostList} />
        ) : (
          <div className="text-center">
            <h3
              style={{
                textAlign: 'center',
              }}
            >
              You have no post yet !
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Account;
