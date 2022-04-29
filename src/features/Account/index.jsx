import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userAPI } from '../../api/auth';
import { uploadAvatar } from '../../api/cloudinary';
import { postApi } from '../../api/post';
import coverImage from '../../assets/imgs/cover.98ab1b0a.webp';
import { changeAvatar } from '../Auth/authSlice';
import CreatePost from '../Newfeeds/components/CreatePost';
import PostList from '../Newfeeds/components/PostList';

function Account(props) {
  const currentUser = JSON.parse(localStorage.getItem('USER'));
  const [postList, setPostList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const dispatch = useDispatch();

  const getPostList = async () => {
    try {
      const { data } = await postApi.getMyPost();
      console.log(data);

      setPostList(data);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const getImgUrl = async () => {
    try {
      const { data } = await uploadAvatar(image);
      await userAPI.updateAvatar({ avatar: data.url });

      dispatch(changeAvatar(data.url));
    } catch (error) {
      enqueueSnackbar('Change avatar image fail', { variant: 'error' });
    }
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };

      getImgUrl();

      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

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
          <div className="profile-avatar">
            <img src={!preview ? currentUser?.avatar : preview} alt="" />
            <div className="change-avatar">
              <label htmlFor="he">
                <i className="fas fa-camera" />
              </label>
              <input
                type="file"
                id="he"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          </div>
          <div className="more-info">
            <div>
              <p className="profile-name">{currentUser.username}</p>
              <span className="quote">
                Dogs and angels are not very far apart. - Charles Bukowski,
                German American Writer
              </span>
            </div>

            <button className="btn btn-change-password">Change password</button>
          </div>
        </div>
      </div>
      <div className="box">
        <CreatePost getPostList={getPostList} />
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
