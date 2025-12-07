import React from 'react';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import DeltaOperation from 'quill';

// function BlogContent({ content: {ops: DeltaOperation[]} }) {

interface BlogContentProps {
  content: {
    ops: DeltaOperation[];
  };
  truncate?: boolean;
}

function BlogContent({ content, truncate = false }: BlogContentProps) {
  const converter = new QuillDeltaToHtmlConverter(content.ops, {});

  let html = converter.convert();

  if (truncate === true) {
    html = html.slice(0, 255) + '...';
  }

  return (
    <>
      <div className='blog-content' dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}

export default BlogContent;
