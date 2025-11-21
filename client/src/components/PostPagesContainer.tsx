import { useEffect, useState } from 'react';

import Post from './Post';
import '../styles/index.css';

interface AllPostsProps {
  postId: string;
  title: string;
  status: 'PUBLISHED' | 'DRAFT';
  userId: string;
  publishedAt: string;
  modifiedAt: string;
  content: object;
}

function PostPagesContainer() {
  const [AllPosts, setAllPosts] = useState<AllPostsProps[]>([]);

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

  useEffect(() => {
    console.log(AllPosts);
  });

  return (
    <>
      <div className='postContainer'>
        {AllPosts.map((post) => (
          <Post
            key={post.postId}
            title={post.title}
            author={post.userId}
            content={JSON.stringify(post.content.ops)}
          />
        ))}
      </div>
    </>
  );
}

export default PostPagesContainer;
