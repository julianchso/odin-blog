import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import DeltaOperation from 'quill';

import Post from './Post';
import '../styles/index.css';

interface AllPostsProps {
  postId: string;
  title: string;
  status: 'PUBLISHED' | 'DRAFT';
  userId: string;
  user: { username: string };
  publishedAt: string;
  modifiedAt: string;
  content: { ops: DeltaOperation[] };
}

function PostPagesContainer() {
  const [AllPosts, setAllPosts] = useState<AllPostsProps[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAllPosts() {
      try {
        const url = 'http://localhost:3000/api/posts';
        const res = await fetch(url, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const json = await res.json();
        console.log(json);

        setAllPosts(json.data);
      } catch (err) {
        console.error('Fetch error: ', err);
      }
    }

    fetchAllPosts();
  }, []);

  return (
    <>
      <div className='postContainer'>
        {AllPosts.map((post) => (
          <button key={post.postId} onClick={() => navigate(`/posts/${post.postId}`)}>
            <Post
              title={post.title}
              author={post.user.username}
              content={JSON.stringify(post.content.ops)}
            />
          </button>
        ))}
      </div>
    </>
  );
}

export default PostPagesContainer;
