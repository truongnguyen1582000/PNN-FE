import React from 'react';

function PostComment({ post }) {
  return (
    <div>
      {post.comments.length > 0 ? (
        <div className="box comment-list-box">
          {post?.comments?.map((comment, index) => (
            <div key={index}>
              <p>{comment.content}</p>
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
