import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import DeltaOperation from 'quill';

import Post from './Post';
import SearchBar from './SearchBar';
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
  const [allPosts, setAllPosts] = useState<AllPostsProps[]>([]);
  const [query, setQuery] = useState('');

  const filteredPosts = allPosts.filter((item) => {
    return item.title.toLowerCase().includes(query.toLowerCase());
    // return item.title.toLowerCase().includes(query.toLowerCase()) || item.content.ops.toLowerCase().includes(query.toLowerCase());
  });

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
        setAllPosts(json.data);
      } catch (err) {
        console.error('Fetch error: ', err);
      }
    }

    fetchAllPosts();
  }, []);

  useEffect(() => {
    console.log(filteredPosts);
  }, [filteredPosts]);

  return (
    <>
      <div className='postContainer'>
        <SearchBar query={query} setQuery={setQuery} />
        {filteredPosts.map((post) => (
          <button key={post.postId} onClick={() => navigate(`/posts/${post.postId}`)}>
            <Post title={post.title} author={post.user.username} content={post.content} />
          </button>
        ))}
      </div>
    </>
  );
}

export default PostPagesContainer;
