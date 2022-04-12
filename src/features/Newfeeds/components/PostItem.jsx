import React from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { postApi } from '../../../api/post';
import PostComment from './PostComment';
import PostCommentor from './PostCommentor';

function PostItem({ post, getPostList }) {
  const currentUser = useSelector((state) => state.user.current);
  const isLikedPost = post?.likes?.some((e) => e._id === currentUser._id);
  const { enqueueSnackbar } = useSnackbar();
  const handleLikePost = async () => {
    try {
      await postApi.likePost(post._id);
      getPostList();
    } catch (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  return (
    <div className="post-item box">
      <div className="create-post__center">
        <div className="author post-author">
          <img src={post.author?.avatar} alt="" height={40} width={40} />
          <div className="name-and-time">
            <p className="name">{post.author?.username}</p>
            <span>{moment(post.createdAt).fromNow()}</span>
          </div>
        </div>
      </div>
      <div className="post-content">
        <p>{post.content}</p>
        <img src={post.imgUrl} alt="" />
      </div>
      <div className="post-action">
        <div className="like" onClick={handleLikePost}>
          {isLikedPost ? (
            <i className="fa-solid fa-heart liked"></i>
          ) : (
            <i className="fa-light fa-heart"></i>
          )}
          <span>Like</span>
        </div>
        <div className="bookmark-save">
          <i className="fa-light fa-bookmark"></i>
          <span>Save</span>
        </div>
        <div className="share">
          <i className="fa-light fa-share-alt"></i>
          <span>Share</span>
        </div>
      </div>
      <PostComment post={post} />
      <PostCommentor post={post} getPostList={getPostList} />
    </div>
  );
}

export default PostItem;
