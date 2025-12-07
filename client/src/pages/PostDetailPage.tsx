import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import DeltaOperation from 'quill';

import FormatDateToNow from '../utils/formatDateToNow';
import BlogContent from '../utils/BlogContent';

interface AllPostsProps {
  postId: string;
  title: string;
  status: 'PUBLISHED' | 'DRAFT';
  userId: string;
  user: { username: string };
  publishedAt: Date;
  modifiedAt: Date;
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
      <div className='post__title'>{post.title}</div>
      <div className='post__username'>{post.user.username}</div>
      <div className='post__publishedAt'>
        PUBLISHED <FormatDateToNow dateTime={post.publishedAt} />
      </div>
      <div className='post__publishedAt'>
        UPDATED <FormatDateToNow dateTime={post.modifiedAt} />
      </div>
      <div className='post__content'>
        <BlogContent content={post.content} />
      </div>
    </div>
  );
}

export default PostDetailPage;
