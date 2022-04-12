import React from 'react';

function PostComment({ post }) {
  return (
    <div>
      {post.comments.length > 0 ? (
        <div className="comment-list-box">
          {post?.comments?.map((comment, index) => (
            <div key={index} className="comment-item">
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
