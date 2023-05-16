'use client';
import { useState } from 'react';
import { useEditor, EditorContent, ReactNodeViewRenderer } from '@tiptap/react';
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
import { Button } from '@/components/button';
import { AlertCircle, Trash } from 'lucide-react';
import { TagSelector } from './tag-selector';
import { TabsContent } from '@/components/tabs';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/use-toast';
import { Icons } from '@/components/icons';
import { Alert, AlertDescription, AlertTitle } from '@/components/alert';
import toast from 'react-hot-toast';
import type { Tag } from '@prisma/client';
import Placeholder from '@tiptap/extension-placeholder';

lowlight.registerLanguage('html', html);
lowlight.registerLanguage('css', css);
lowlight.registerLanguage('js', js);
lowlight.registerLanguage('ts', ts);

export default function Editor({
  userId,
  tagOptions,
}: {
  userId: string;
  tagOptions: Tag[];
}) {
  const [input, setInput] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [language, setLanguage] = useState('typescript');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
  const { toast: toast2 } = useToast();

  function delay(ms: number): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    async function createPost() {
      const res = await fetch('/api/create', {
        method: 'POST',
        body: JSON.stringify({
          body: input,
          title,
          tags,
          userId,
        }),
      });
      if (!res.ok) throw new Error(res.statusText);

      return res;
    }

    try {
      const toastPromise = toast.promise(
        createPost(),
        {
          loading: 'Creating post...',
          success: <b>🥳 Post created!</b>,
          error: <b>🙃 Could not create post.</b>,
        },
        {
          position: 'bottom-right',
          className: 'bg-black',
        }
      );

      // Wait for the promise to resolve
      const res = await toastPromise;
      if (res.ok) router.push('/');
      setLoading(false);

      // user created!
    } catch (err: any) {
      setLoading(false);
      setError('🙃 Something went wrong, try again!');
      console.error(err);
    }
  }

  const editor = useEditor({
    onUpdate: ({ editor }) => {
      const json = editor.getHTML();
      setInput(json);
      //   localStorage.setItem(`content`, json);
    },
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] } as any),
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
      Placeholder.configure({
        placeholder: `Type your question here!`,
      }),
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
    <>
      {error ? (
        <Alert className="w-60 mb-8" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      <div className=" h-full items-stretch ">
        {/* <div className="h-fit sm:h-full border justify-start items-center p-4 flex-col space-y-4 sm:flex md:order-2">
          <div className="grid gap-2 relative "> */}
        <TagSelector
          setTags={setTags}
          tags={tags}
          title="Tags"
          options={tagOptions}
        />
        {/* </div>
        </div> */}
        <div className="md:order-1 h-full">
          <TabsContent value="complete" className="mt-0 border-0 p-0 h-full">
            <div className="flex flex-col h-full w-full">
              <div className="flex flex-col h-full editor-content-parent overflow-auto">
                <EditorMenuBar editor={editor} />
                <input
                  className="flex flex-grow font-bold text-2xl border-2 border-b-0 p-8 mt-2 bg-transparent"
                  placeholder="Give it a title!"
                  value={title}
                  maxLength={100}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ wordWrap: 'break-word' }}
                />
                <EditorContent content={input} editor={editor} />
              </div>

              <div className="flex items-center space-x-2 my-4 z-10">
                <Button
                  className="px-4 py-3"
                  onClick={(e: any) => onSubmit(e)}
                  // onClick={(e: any) => onSubmit(e)}
                  disabled={!title || !input || loading}
                >
                  {loading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    'Submit'
                  )}
                </Button>
                <Button
                  className="px-4 py-3"
                  disabled={!title || !input || loading}
                  variant="destructive"
                  onClick={() => {
                    setTitle('');
                    editor.commands.clearContent();
                    setInput('');
                  }}
                >
                  {loading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <span className="mr-2">Trash</span>
                      <Trash className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>
        </div>
      </div>
    </>
  );
}
