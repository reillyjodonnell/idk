import { Button } from '@/components/button';
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/menubar';
import type { Editor as EditorType } from '@tiptap/react';
import clsx from 'clsx';
import {
  Bold as BoldIcon,
  Braces,
  Code,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Type,
  Undo,
} from 'lucide-react';

export default function EditorMenuBar({ editor }: { editor: EditorType }) {
  if (!editor) {
    return null;
  }
  return (
    <Menubar className="overflow-y-auto h-fit p-4 w-fit xl:overflow-hidden flex-wrap lg:flex-nowrap my-4 sm:my-0 menubar">
      <MenubarMenu>
        <Button
          variant={'outline'}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={clsx(
            editor.isActive('bold') ? 'is-active' : '',
            'border-none'
          )}
        >
          <BoldIcon />
        </Button>
        <Button
          variant={'outline'}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={clsx(
            editor.isActive('italic') ? 'is-active' : '',
            'border-none'
          )}
        >
          <Italic />
        </Button>
        <Button
          variant={'outline'}
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={clsx(
            editor.isActive('code') ? 'is-active' : '',
            'border-none'
          )}
        >
          <Code />
        </Button>

        <Button
          variant={'outline'}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={clsx(
            editor.isActive('codeBlock') ? 'is-active' : '',
            'border-none'
          )}
        >
          <Braces />
        </Button>

        <Button
          variant={'outline'}
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={clsx(
            editor.isActive('paragraph') ? 'is-active' : '',
            'border-none'
          )}
        >
          <Type />
        </Button>
        <Button
          variant={'outline'}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={clsx(
            editor.isActive('heading', { level: 1 }) ? 'is-active' : '',
            'border-none'
          )}
        >
          <Heading1 />
        </Button>
        <Button
          variant={'outline'}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={clsx(
            editor.isActive('heading', { level: 2 }) ? 'is-active' : '',
            'border-none'
          )}
        >
          <Heading2 />
        </Button>
        <Button
          variant={'outline'}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={clsx(
            editor.isActive('heading', { level: 3 }) ? 'is-active' : '',
            'border-none'
          )}
        >
          <Heading3 />
        </Button>

        <Button
          variant={'outline'}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={clsx(
            editor.isActive('bulletList') ? 'is-active' : '',
            'border-none'
          )}
        >
          <List />
        </Button>
        <Button
          variant={'outline'}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={clsx(
            editor.isActive('orderedList') ? 'is-active' : '',
            'border-none'
          )}
        >
          <ListOrdered />
        </Button>

        <Button
          variant={'outline'}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={clsx(
            editor.isActive('blockquote') ? 'is-active' : '',
            'border-none'
          )}
        >
          <Quote />
        </Button>

        <Button
          variant={'outline'}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <Undo />
        </Button>
        <Button
          variant={'outline'}
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <Redo />
        </Button>
      </MenubarMenu>
    </Menubar>
  );
}
