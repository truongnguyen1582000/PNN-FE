import PostItem from './PostItem';

function PostList({ postList }) {
  return (
    <div>
      <ul>
        {postList.map((post, index) => (
          <li key={index}>
            <PostItem post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
