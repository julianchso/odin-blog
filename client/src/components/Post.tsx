import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import DeltaOperation from 'quill';

import BlogContent from '../utils/BlogContent';

import '../styles/index.css';

interface PostProps {
  title: string;
  author: string;
  content: {
    ops: DeltaOperation[];
  };
}

function Post({ title, author, content }: PostProps) {
  return (
    <>
      <div className='post_Ctn'>
        <div className='post_Ctn__title'>{title}</div>
        <div className='post_Ctn__author'>{author}</div>
        <BlogContent content={content} truncate={true} />
      </div>
    </>
  );
}

export default Post;
