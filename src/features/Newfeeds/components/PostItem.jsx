import React from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import avt from '../../../assets/imgs/non-avatar.png';

function PostItem({ post }) {
  const currentUser = useSelector((state) => state.user.current);
  return (
    <div className="post-item box">
      <div className="create-post__center">
        <div className="author post-author">
          <img src={post.author?.avatar ? post.author.avatar : avt} alt="" />
          <div className="name-and-time">
            <p className="name">{currentUser.username}</p>
            <span>{moment(post.createdAt).fromNow()}</span>
          </div>
        </div>
      </div>
      <div className="post-content">
        <p>{post.content}</p>
        <img src={post.imgUrl} alt="" />
      </div>
      <div className="post-action ">
        <div className="like">
          <i className="fa-light fa-heart"></i>
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
      <div className="post-comment"></div>
    </div>
  );
}

export default PostItem;
