import React, { useRef, useState } from 'react';
import Quill, { Delta } from 'quill';
import QuillEditor from './QuillEditor';

import Button from './Button';
import '../styles/QuillStyles.css';
import { fetchWithAuth } from '../services/auth';

function NewPostForm() {
  const Delta = Quill.import('delta');
  const [title, setTitle] = useState('');
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);
  const quillRef = useRef<Quill | null>();

  const handleNewPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quillRef.current) return;

    const delta = quillRef.current.getContents();

    console.log(delta);

    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({ title, content: delta }),
      };

      const res = await fetchWithAuth('http://localhost:3000/api/posts/newPost', options);
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error('Fetch error: ', err);
    }
  };

  return (
    <section>
      <form onSubmit={handleNewPost}>
        <label htmlFor='title'>
          Title:
          <input type='text' name='title' onChange={(e) => setTitle(e.target.value)} />
        </label>
        <QuillEditor
          ref={quillRef}
          readOnly={readOnly}
          defaultValue={new Delta()}
          onSelectionChange={setRange}
          onTextChange={setLastChange}
        />
        <div>
          <label>
            Read Only:{' '}
            <input
              type='checkbox'
              value={readOnly}
              onChange={(e) => setReadOnly(e.target.checked)}
            />
          </label>
          <button
            type='button'
            onClick={() => {
              alert(quillRef.current?.getLength());
            }}
          >
            Get Content Length
          </button>
        </div>
        <div className={'state'}>
          <div className={'state-title'}>Current Range:</div>
          {range ? JSON.stringify(range) : 'Empty'}
        </div>
        <div className={'state'}>
          <div className={'state-title'}>Last Change:</div>
          {lastChange ? JSON.stringify(lastChange.ops) : 'Empty'}
        </div>
        <Button type='submit' size='md' color='primary'>
          Publish
        </Button>
      </form>
    </section>
  );
}

export default NewPostForm;
