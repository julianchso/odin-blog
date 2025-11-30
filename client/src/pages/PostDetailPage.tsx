import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import DeltaOperation from 'quill';

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

function PostDetailPage() {
  const { postId } = useParams();
  const [post, setPost] = useState<AllPostsProps | null>(null);

  useEffect(() => {
    async function fetchPost() {
      const res = await fetch(`http://localhost:3000/api/posts/${postId}`);
      const json = await res.json();
      setPost(json.data);
    }
    fetchPost();
  }, [postId]);

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.user.username}</p>
      <div>{JSON.stringify(post.content.ops)}</div>
    </div>
  );
}

export default PostDetailPage;
