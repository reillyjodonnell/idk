'use client';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { Popover, PopoverContent } from './popover';
import { Button } from './button';
import { Settings2, Smile } from 'lucide-react';
import { Label } from './label';
import { Input } from './input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from './use-toast';
import { ToastAction } from './toast';

const emojiMap = {
  eyes: '👀',
  fire: '🔥',
  thumbsUp: '👍',
  thumbsDown: '👎',
};

export default function ReactionPopover({
  authorId,
  commentId,
  commentAuthorId,
}: {
  authorId: string | null;
  commentId: number;
  commentAuthorId: string;
}) {
  const [openPopover, setOpenPopover] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const router = useRouter();
  async function react({ emoji }: { emoji: string }) {
    if (!authorId) {
      //redirect to login
      router.push('/login');
    }
    try {
      const res = await fetch('/api/questions/react', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          commentId,
          authorId,
          emoji,
        }),
      });

      if (!res.ok) throw new Error('🙃 Something went wrong.');

      if (res.ok) {
        // reload the page
        router.refresh();
        setOpenPopover(false);
      }
    } catch (err) {
      setOpenPopover(false);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: `Couldn't react to the comment!`,
        action: (
          <ToastAction
            onClick={() => react({ emoji: selectedEmoji })}
            altText="Try again"
          >
            Try again
          </ToastAction>
        ),
      });
    }
  }

  return (
    <Popover open={openPopover}>
      <PopoverTrigger onClick={() => setOpenPopover(true)} asChild>
        <Button variant="outline" className="w-10 rounded-full p-0">
          <Smile className="h-4 w-4" />
          <span className="sr-only">React</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-2">
        <div className="flex">
          <div
            onClick={() => {
              setSelectedEmoji('thumbsUp');
              react({ emoji: 'thumbsUp' });
            }}
            className="p-2 cursor-pointer hover:bg-pink-500 rounded-lg"
          >
            <span>👍</span>
          </div>
          <div
            onClick={() => {
              setSelectedEmoji('thumbsDown');
              react({ emoji: 'thumbsDown' });
            }}
            className="p-2 cursor-pointer hover:bg-pink-500 rounded-lg"
          >
            <span>👎</span>
          </div>
          <div
            onClick={() => {
              setSelectedEmoji('fire');
              react({ emoji: 'fire' });
            }}
            className="p-2 cursor-pointer hover:bg-pink-500 rounded-lg"
          >
            <span>🔥</span>
          </div>
          <div
            onClick={() => {
              setSelectedEmoji('eyes');
              react({ emoji: 'eyes' });
            }}
            className="p-2 cursor-pointer hover:bg-pink-500 rounded-lg"
          >
            <span>👀</span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
