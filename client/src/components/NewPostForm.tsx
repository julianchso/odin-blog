import React, { useRef, useState } from 'react';
import Quill from 'quill';
import QuillEditor from './QuillEditor';

import Button from './Button';
import '../styles/QuillStyles.css';

function NewPostForm() {
  const Delta = Quill.import('delta');
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);
  const quillRef = useRef();

  const handleNewPost = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = 'http://localhost:3000/api/newPost';
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
    } catch (err) {
      console.error('Fetch error: ', err);
    }
  };

  return (
    <section>
      <form onSubmit={handleNewPost}>
        <QuillEditor
          ref={quillRef}
          readOnly={readOnly}
          defaultValue={new Delta()
            .insert('Title')
            .insert('\n', { header: 1 })
            .insert('Content')
            .insert('\n')}
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
