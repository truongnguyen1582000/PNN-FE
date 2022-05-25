import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { userAPI } from '../../api/auth';
import { uploadAvatar } from '../../api/cloudinary';
import { postApi } from '../../api/post';
import { bookmarkAPI } from '../../api/user';
import coverImage from '../../assets/imgs/cover.98ab1b0a.webp';
import { changeAvatar, changeName } from '../Auth/authSlice';
import CreatePost from '../Newfeeds/components/CreatePost';
import PostList from '../Newfeeds/components/PostList';

function Account({ mode = 1 }) {
  const user = useSelector((state) => state.user);
  const [currentUser, setcurrentUser] = useState(user.current);
  const [postList, setPostList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);
  const [name, setName] = useState(currentUser.username);
  const [showPassword, setShowPassword] = useState(false);
  const [changePassInfo, setChangePassInfo] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const location = useLocation();
  console.log(user);

  const getPostList = async () => {
    try {
      if (mode === 1) {
        const { data } = await postApi.getMyPost();
        setPostList(data);
      } else {
        const { data } = await postApi.getPostOfUser(
          location.pathname.split('/').pop()
        );

        setPostList(data);
      }
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

  useEffect(
    () => {
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
    },
    // eslint-disable-next-line
    [image]
  );

  useEffect(
    () => {
      getPostList();
      if (mode === 2) {
        const getUser = async () => {
          const { data } = await bookmarkAPI.getUserInfo(
            location.pathname.split('/').pop()
          );
          setcurrentUser(data);
        };
        getUser();
      }
    },
    // eslint-disable-next-line
    []
  );

  const handleChangePassword = async (e) => {
    try {
      await userAPI.changePassword(changePassInfo);
      setChangePassInfo({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setShowPassword(false);
      enqueueSnackbar('Change password successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

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
            {mode === 1 && (
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
            )}
          </div>
          <div className="more-info">
            <div>
              <p className="profile-name">
                {!showEdit ? (
                  currentUser.username
                ) : (
                  <input
                    value={name}
                    className="change-name"
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        userAPI.updateUsername({ username: name });
                        dispatch(changeName(name));
                        setShowEdit(false);

                        enqueueSnackbar('Change name success', {
                          variant: 'success',
                        });

                        getPostList();

                        setName(e.target.value);
                      }
                    }}
                  />
                )}

                {mode === 1 && (
                  <>
                    {!showEdit ? (
                      <i
                        className="fas fa-pen edit-name-btn"
                        onClick={() => setShowEdit(true)}
                      ></i>
                    ) : (
                      <i
                        className="fas fa-check edit-name-btn"
                        onClick={() => {
                          userAPI.updateUsername({ username: name });
                          dispatch(changeName(name));
                          setShowEdit(false);

                          enqueueSnackbar('Change name success', {
                            variant: 'success',
                          });

                          getPostList();

                          setName(name);
                        }}
                      ></i>
                    )}
                  </>
                )}
              </p>
              <span className="quote">{currentUser.quote}</span>
            </div>

            {mode === 1 && (
              <div>
                <button
                  className="btn btn-change-password"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  style={{
                    textTransform: 'none',
                    borderRadius: '20px',
                    padding: '4px 8px',
                  }}
                >
                  Change password
                </button>
                {showPassword && (
                  <div className="change-password">
                    <input
                      type="password"
                      placeholder="Old password"
                      name="oldPassword"
                      onChange={(e) => {
                        setChangePassInfo({
                          ...changePassInfo,
                          oldPassword: e.target.value,
                        });
                      }}
                    />
                    <input
                      type="password"
                      placeholder="New password"
                      name="newPassword"
                      onChange={(e) => {
                        setChangePassInfo({
                          ...changePassInfo,
                          newPassword: e.target.value,
                        });
                      }}
                    />
                    <input
                      type="password"
                      placeholder="Confirm password"
                      name="confirmPassword"
                      onChange={(e) => {
                        setChangePassInfo({
                          ...changePassInfo,
                          confirmPassword: e.target.value,
                        });
                      }}
                    />
                    <button
                      style={{
                        backgroundColor: '#4E944F',
                        color: 'white',
                        borderRadius: '20px',
                        padding: '4px 8px',
                        cursor: 'pointer',
                        marginTop: '8px',
                      }}
                      onClick={handleChangePassword}
                    >
                      Change
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {mode === 1 && (
        <div className="box">
          <CreatePost getPostList={getPostList} />
        </div>
      )}
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
