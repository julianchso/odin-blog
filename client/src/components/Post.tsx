import '../styles/index.css';

// function Post(title: string, author: string, content: string) {
interface PostProps {
  title: string;
  author: string;
  // content?: object;
  content?: string;
}

function Post({ title, author, content }: PostProps) {
  return (
    <>
      <div className='post'>
        <div className='post__title'>{title}</div>
        <div className='post__author'>{author}</div>
        <div className='post__content'>{content}</div>
      </div>
    </>
  );
}

export default Post;
