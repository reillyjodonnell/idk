'use client';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { useEditor, EditorContent, ReactNodeViewRenderer } from '@tiptap/react';
import type { Editor as EditorType } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlock from '@tiptap/extension-code-block';
import Document from '@tiptap/extension-document';
import Text from '@tiptap/extension-text';
import { lowlight } from 'lowlight';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import CodeEditorButtons from './code-editor-buttons';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import EditorMenuBar from './editor-menu-bar';
import './code-editor-buttons.css';
import { Textarea } from '@/components/textarea';
import { Button } from '@/components/button';
import { History, Trash } from 'lucide-react';

lowlight.registerLanguage('html', html);
lowlight.registerLanguage('css', css);
lowlight.registerLanguage('js', js);
lowlight.registerLanguage('ts', ts);

export default function Editor() {
  const [input, setInput] = useState('');
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('typescript');

  const editor = useEditor({
    onUpdate: ({ editor }) => {
      const json = editor.getHTML();
      setInput(json);
      //   localStorage.setItem(`content`, json);
    },
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
      Document,
      Text,
      CodeBlock,
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeEditorButtons);
        },
      }).configure({
        lowlight,
      }),
    ],
  });
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-col h-full editor-content-parent">
        <EditorMenuBar editor={editor} />
        <input
          className="flex flex-grow font-bold text-2xl border-2 border-b-0 p-4 mt-2 bg-transparent"
          placeholder="Give it a title!"
          value={title}
          maxLength={100}
          onChange={(e) => setTitle(e.target.value)}
          style={{ wordWrap: 'break-word' }}
        />
        <EditorContent content={input} editor={editor} />
      </div>

      <div className="flex items-center space-x-2 my-4">
        <Button className="px-4 py-3" disabled={!title || !input}>
          Submit
        </Button>
        <Button
          className="px-4 py-3"
          disabled={!title || !input}
          variant="destructive"
          onClick={() => {
            setTitle('');
            editor.commands.clearContent();
            setInput('');
          }}
        >
          <span className="mr-2">Trash</span>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

const MenuBar = ({ editor }: { editor: EditorType }) => {
  return <div className="flex border p-2 "></div>;
};
