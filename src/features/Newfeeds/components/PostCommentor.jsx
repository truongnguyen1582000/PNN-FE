import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { postApi } from '../../../api/post';

function PostCommentor({ post, getPostList }) {
  const [comment, setComment] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postApi.commentPost(post._id, { content: comment });
      getPostList();
    } catch (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="comment-input">
        <div className="comment-input__box">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            className="comment-input__input"
            placeholder="Write a comment..."
          />
          <button className="comment-input__button" type="submit">
            <i className="fa-light fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </form>
  );
}

export default PostCommentor;
