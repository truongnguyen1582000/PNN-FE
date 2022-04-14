import React, { useEffect, useRef, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { uploadAvatar } from '../../../api/cloudinary';
import { postApi } from '../../../api/post';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';

function PopupCreatePost({ open, handleClose, getPostList }) {
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const fileInputRef = useRef();
  const [postContent, setPostContent] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const currentUser = useSelector((state) => state.user.current);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (image) {
        setPostContent('');
        const { data } = await uploadAvatar(image);
        await postApi.createPost({
          content: postContent,
          imgUrl: data.url,
        });
      } else {
        setPostContent('');
        await postApi.createPost({
          content: postContent,
        });
      }

      handleClose();
      enqueueSnackbar('Create post successfully', { variant: 'success' });
      getPostList();
    } catch (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  };
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth={true}
      className="create-post__container"
    >
      <form onSubmit={handleSubmit} className="create-post__form">
        <div className="create-post__top">
          <h2>Create Post</h2>
          <i className="fa-solid fa-xmark" onClick={handleClose}></i>
        </div>
        <div className="create-post__center">
          <div className="author">
            <img src={currentUser?.avatar} alt="" height={56} width={56} />
            <p className="name-author-create">{currentUser.username}</p>
          </div>
        </div>
        <div className="create-post__bottom">
          <textarea
            name="post-content"
            rows="4"
            placeholder="What do you want to share?"
            value={postContent}
            onChange={(e) => {
              e.preventDefault();
              setPostContent(e.target.value);
            }}
          ></textarea>
          <label
            htmlFor="file"
            className="lable-input"
            style={{
              position: 'absolute',
              bottom: '24px',
              right: '24px',
            }}
          >
            <i className="fa-solid fa-image"></i>
          </label>
          <input
            type="file"
            id="file"
            className="file-input"
            ref={fileInputRef}
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        {preview && (
          <div
            style={{
              textAlign: 'center',
              margin: '0 16px',
              borderRadius: '8px',
              boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <i
              className="fas fa-times"
              style={{
                position: 'absolute',
                right: '24px',
                top: '24px',
                fontSize: '24px',
                cursor: 'pointer',
                borderRadius: '50%',
                border: '1px solid #ccc',
                padding: '4px 8px',
              }}
              onClick={() => setImage(null)}
            ></i>
            <img src={preview} alt="" style={{ width: '100%' }} />
          </div>
        )}
        <div className="btn-wrapper">
          <button
            className={`create-post__btn ${
              postContent === '' ? 'not-allowed' : 'active-btn'
            }`}
            disabled={postContent === ''}
            onClick={handleSubmit}
          >
            Create
          </button>
        </div>
      </form>
    </Dialog>
  );
}

export default PopupCreatePost;
