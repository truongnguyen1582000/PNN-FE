import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { postApi } from '../../../api/post';

function PostCommentor({ post, getPostList }) {
  const [comment, setComment] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const currentUser = useSelector((state) => state.user.current);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment) {
      return;
    }
    try {
      await postApi.commentPost(post._id, { content: comment });
      setComment('');
      getPostList();
    } catch (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="comment-input">
        <img src={currentUser?.avatar} ưidth={32} height={32} alt="" />
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          type="text"
          className="comment-input__input"
          placeholder="Write a comment..."
        />
        <button
          className={`comment-input__button ${comment === '' && 'disable'}`}
          type="submit"
          disabled={comment === ''}
        >
          <i className="fa-light fa-paper-plane"></i>
        </button>
      </div>
    </form>
  );
}

export default PostCommentor;
