import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PopupCreatePost from './PopupCreatePost';

function CreatePost({ getPostList, mode = 'post' }) {
  const currentUser = useSelector((state) => state.user.current);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="box create-post">
      <img
        src={currentUser?.avatar}
        alt=""
        width={40}
        height={40}
        className="avatar"
      />
      <div className="input-wrapper">
        <input
          onClick={handleClickOpen}
          type="text"
          placeholder={`${currentUser.username}, ${
            mode === 'rescue' ? 'what help do you need?' : 'what do you think?'
          }`}
        />
        <div className="icons">
          <i className="fa-solid fa-bars-staggered"></i>
          <i className="fa-solid fa-camera"></i>
          <i className="fa-solid fa-face-smile"></i>
        </div>
      </div>
      <PopupCreatePost
        open={open}
        handleClose={handleClose}
        getPostList={getPostList}
        mode={mode}
      />
    </div>
  );
}

export default CreatePost;
