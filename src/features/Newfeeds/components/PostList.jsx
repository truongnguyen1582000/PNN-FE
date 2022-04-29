import PostItem from './PostItem';

function PostList({ postList, getPostList, mode = 'post' }) {
  return (
    <div>
      <ul>
        {postList.map((post, index) => (
          <li key={index}>
            <PostItem post={post} getPostList={getPostList} mode={mode} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
