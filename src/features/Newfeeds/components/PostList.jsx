import PostItem from './PostItem';

function PostList({ postList, getPostList }) {
  return (
    <div>
      <ul>
        {postList.map((post, index) => (
          <li key={index}>
            <PostItem post={post} getPostList={getPostList} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
