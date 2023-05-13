'use client';
import { useEditor, EditorContent, ReactNodeViewRenderer } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlock from '@tiptap/extension-code-block';
import Document from '@tiptap/extension-document';
import Text from '@tiptap/extension-text';
import { lowlight } from 'lowlight';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import '../../ask/code-editor-buttons.css';
import './formatted-content.css';
export default function FormattedContent({
  content,
  title,
}: {
  content: string;
  title: string;
}) {
  const updated = content + '```<div>wow</div>```';
  const editor = useEditor({
    editable: false,
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
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: content,
  });
  if (!editor) {
    return null;
  }
  return (
    <div className="flex flex-col justify-start border bg-accent">
      <h1 className="p-4 md:p-6">{title}</h1>
      <EditorContent editor={editor} />
    </div>
  );
}
