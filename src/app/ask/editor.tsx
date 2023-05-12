'use client';
import { useState } from 'react';
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
import { Button } from '@/components/button';
import { AlertCircle, Trash } from 'lucide-react';
import { TagSelector } from './tag-selector';
import { TabsContent } from '@/components/tabs';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/use-toast';
import { Icons } from '@/components/icons';
import { Alert, AlertDescription, AlertTitle } from '@/components/alert';

const options = [
  { label: 'JavaScript', value: 'JavaScript' },
  { label: 'React', value: 'React' },
  { label: 'Angular', value: 'Angular' },
  { label: 'Vue.js', value: 'Vue.js' },
  { label: 'Node.js', value: 'Node.js' },
  { label: 'Java', value: 'Java' },
  { label: 'Spring', value: 'Spring' },
  { label: 'Python', value: 'Python' },
  { label: 'Django', value: 'Django' },
  { label: 'Flask', value: 'Flask' },
  { label: 'PHP', value: 'PHP' },
  { label: 'Laravel', value: 'Laravel' },
  { label: 'Symfony', value: 'Symfony' },
  { label: 'Ruby', value: 'Ruby' },
  { label: 'Rails', value: 'Rails' },
  { label: 'C#', value: 'C#' },
  { label: '.NET', value: '.NET' },
  { label: 'ASP.NET', value: 'ASP.NET' },
  { label: 'Swift', value: 'Swift' },
  { label: 'iOS', value: 'iOS' },
  { label: 'Android', value: 'Android' },
  { label: 'Kotlin', value: 'Kotlin' },
  { label: 'Go', value: 'Go' },
  { label: 'Rust', value: 'Rust' },
  { label: 'TypeScript', value: 'TypeScript' },
  { label: 'Express.js', value: 'Express.js' },
  { label: 'Next.js', value: 'Next.js' },
  { label: 'Gatsby', value: 'Gatsby' },
  { label: 'Nest.js', value: 'Nest.js' },
  { label: 'React Native', value: 'React Native' },
  { label: 'Flutter', value: 'Flutter' },
  { label: 'Vue Native', value: 'Vue Native' },
  { label: 'Ionic', value: 'Ionic' },
  { label: 'Electron', value: 'Electron' },
  { label: 'jQuery', value: 'jQuery' },
  { label: 'Bootstrap', value: 'Bootstrap' },
  { label: 'Tailwind CSS', value: 'Tailwind CSS' },
  { label: 'Sass', value: 'Sass' },
  { label: 'Less', value: 'Less' },
  { label: 'PostgreSQL', value: 'PostgreSQL' },
  { label: 'MySQL', value: 'MySQL' },
  { label: 'MongoDB', value: 'MongoDB' },
  { label: 'Redis', value: 'Redis' },
  { label: 'GraphQL', value: 'GraphQL' },
  { label: 'Apollo', value: 'Apollo' },
  { label: 'REST API', value: 'REST API' },
  { label: 'WebSocket', value: 'WebSocket' },
  { label: 'Docker', value: 'Docker' },
  { label: 'Kubernetes', value: 'Kubernetes' },
];

lowlight.registerLanguage('html', html);
lowlight.registerLanguage('css', css);
lowlight.registerLanguage('js', js);
lowlight.registerLanguage('ts', ts);

export default function Editor({ userId }: { userId: string }) {
  const [input, setInput] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [language, setLanguage] = useState('typescript');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
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
      // redirect to home
      toast({
        title: '🥳 Post created! ',
        description: 'Your post has been created successfully.',
      });
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
    <>
      {error ? (
        <Alert className="w-60 mb-8" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
        <div className="hidden h-full border justify-start items-center p-4 flex-col space-y-4 sm:flex md:order-2">
          <div className="grid gap-2 relative ">
            <TagSelector
              setTags={setTags}
              tags={tags}
              title="Tags"
              options={options}
            />
          </div>
        </div>
        <div className="md:order-1 h-full">
          <TabsContent value="complete" className="mt-0 border-0 p-0 h-full">
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
                <Button
                  className="px-4 py-3"
                  onClick={(e: any) => onSubmit(e)}
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
