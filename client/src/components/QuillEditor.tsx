import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import Quill, { Delta, Op } from 'quill';
import 'quill/dist/quill.snow.css';

type QuillEditorProps = {
  readOnly?: boolean;
  defaultValue?: Delta | Op[];
  onTextChange?: (delta: Delta, oldDelta: Delta, source: 'api' | 'user' | 'silent') => void;
  onSelectionChange?: (
    range: ReturnType<Quill['getSelection']>,
    oldRange: ReturnType<Quill['getSelection']>,
    source: 'api' | 'user' | 'silent'
  ) => void;
};

const QuillEditor = forwardRef<Quill | null, QuillEditorProps>(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      if (ref && 'current' in ref && ref.current) {
        ref.current?.enable(!readOnly);
      }
    }, [ref, readOnly]);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;
      const editorContainer = container.appendChild(
        container.ownerDocument.createElement('article')
      );
      const quill = new Quill(editorContainer, {
        theme: 'snow',
      });

      if (!ref) return;

      if (typeof ref === 'function') {
        ref(quill);
      } else if (ref) {
        ref.current = quill;
      }

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      return () => {
        if (typeof ref === 'function') ref(null);
        else if (ref) ref.current = null;
        container.innerHTML = '';
      };
    }, [ref]);

    return <section ref={containerRef}></section>;
  }
);

QuillEditor.displayName = 'Editor';

export default QuillEditor;
