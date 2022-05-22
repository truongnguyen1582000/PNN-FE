import React from 'react';

function PostComment({ post }) {
  const currentUser = JSON.parse(localStorage.getItem('USER'));
  return (
    <div>
      {post.comments.length > 0 ? (
        <div className="comment-list-box">
          {post?.comments?.map((comment, index) => (
            <div
              key={index}
              className="comment-item"
              onClick={() => {
                if (currentUser._id === comment.commentBy._id) {
                  window.location.href = `/home-page/account`;
                } else {
                  window.location.href = `/home-page/profile/${comment.commentBy._id}`;
                }
              }}
            >
              <img
                src={comment.commentBy?.avatar}
                width={30}
                height={30}
                alt=""
              />
              <div className="comment-content">
                <span>{comment.commentBy?.username}</span>
                <p>{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default PostComment;
