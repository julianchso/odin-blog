import '../styles/index.css';

interface PostProps {
  title: string;
  author: string;
  content?: string;
}

function Post({ title, author, content }: PostProps) {
  return (
    <>
      <div className='post_Ctn'>
        <div className='post_Ctn__title'>{title}</div>
        <div className='post_Ctn__author'>{author}</div>
        <div className='post_Ctn__content'>{content}</div>
      </div>
    </>
  );
}

export default Post;
