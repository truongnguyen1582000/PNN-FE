import React, { useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { postApi } from '../../../api/post';
import PostComment from './PostComment';
import PostCommentor from './PostCommentor';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FlagIcon from '@mui/icons-material/Flag';
import { useNavigate } from 'react-router-dom';

function PostItem({ post, getPostList, mode }) {
  const currentUser = useSelector((state) => state.user.current);
  const isLikedPost = post?.likes?.some((e) => e._id === currentUser._id);
  const isSavePost = post?.bookmark?.some((e) => e === currentUser._id);
  const isPostOwner = post?.author?._id === currentUser._id;
  const showHehe = mode === 'rescue' && isPostOwner;
  const navigate = useNavigate();

  const [showMore, setShowMore] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const handleLikePost = async () => {
    try {
      await postApi.likePost(post._id);
      getPostList();
    } catch (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  const handleSavePost = async () => {
    try {
      await postApi.addToBookmark(post._id);
      getPostList();
    } catch (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  const handleDelete = async () => {
    try {
      await postApi.deletePost(post._id);
      getPostList();
      setShowMore(false);
    } catch (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  const handleSetStatus = async () => {
    try {
      await postApi.setStatus(post._id);
      getPostList();
    } catch (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  const handleSeeDetailProfile = () => {
    if (post.author._id === currentUser._id) {
      navigate('/home-page/account');
    } else {
      navigate(`/home-page/profile/${post.author._id}`);
    }
  };

  return (
    <div className="post-item box">
      <div className="create-post__center">
        <div className="author post-author" onClick={handleSeeDetailProfile}>
          <img src={post.author?.avatar} alt="" height={40} width={40} />
          <div className="name-and-time">
            <p className="name">{post.author?.username}</p>
            <span>{moment(post.createdAt).fromNow()}</span>
          </div>
        </div>
        {mode === 'rescue' && (
          <div>
            {!post.isOpen ? (
              <div className="rescued">
                <span>Rescued</span> <i className="fa-solid fa-check"></i>
              </div>
            ) : (
              <div className="not-rescued">
                <span>Finding help</span>
                <i className="fa-solid fa-hand-heart"></i>
              </div>
            )}
          </div>
        )}

        <div className="edit-post-button">
          {showHehe && (
            <div>
              <button
                onClick={handleSetStatus}
                className={
                  post.isOpen ? 'change-status-btn open' : 'change-status-btn'
                }
              >
                {post.isOpen ? (
                  <i className="fa-solid fa-circle-xmark"></i>
                ) : (
                  <i className="fa-solid fa-arrow-rotate-left"></i>
                )}
              </button>
            </div>
          )}
          <MoreVertIcon onClick={() => setShowMore(!showMore)} />
          {showMore && (
            <div
              className="post-option"
              style={{
                right: mode === 'rescue' && '20%',
              }}
            >
              {isPostOwner && (
                <i>
                  <EditIcon
                    fontSize="small"
                    onClick={() => setShowMore(false)}
                  />
                </i>
              )}
              {isPostOwner && (
                <i>
                  <DeleteIcon fontSize="small" onClick={handleDelete} />
                </i>
              )}

              {!isPostOwner && (
                <i>
                  <FlagIcon
                    fontSize="small"
                    onClick={() => setShowMore(false)}
                  />
                </i>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="post-content">
        <p>{post.content}</p>
        <img src={post.imgUrl} alt="" />
      </div>
      <div className="post-action">
        <span>
          {post?.likes?.length > 0 && (
            <span className="like-count">
              {post.likes
                ?.splice(0, post.likes.length > 2 ? 2 : post.likes.length)
                .map((e) => e.username)
                .join(', ')}{' '}
              {post.likes?.length > 1 && (
                <span>
                  {' '}
                  and {post.likes?.length > 0 && post.likes?.length} others
                </span>
              )}
              {mode === 'post' ? ' liked this post' : ' pray for this post'}
            </span>
          )}
        </span>
      </div>
      <div className="post-action">
        <div className="like" onClick={handleLikePost}>
          {isLikedPost ? (
            mode === 'post' ? (
              <i className="fa-solid fa-heart liked"></i>
            ) : (
              <i className="fa-solid fa-suitcase-medical liked"></i>
            )
          ) : mode === 'post' ? (
            <i className="fa-light fa-heart"></i>
          ) : (
            <i className="fa-light fa-suitcase-medical"></i>
          )}
          <p>{mode === 'post' ? 'Like' : 'Pray'}</p>
        </div>
        {mode === 'post' && (
          <div className="bookmark-save" onClick={handleSavePost}>
            {isSavePost ? (
              <i className="fa-solid fa-bookmark saved"></i>
            ) : (
              <i className="fa-light fa-bookmark"></i>
            )}
            <span>Save</span>
          </div>
        )}

        {mode === 'post' && (
          <div className="share">
            <i className="fa-light fa-share-alt"></i>
            <span>Share</span>
          </div>
        )}
      </div>
      <PostComment post={post} />
      <PostCommentor post={post} getPostList={getPostList} />
    </div>
  );
}

export default PostItem;
