'use client';
import { Reaction } from '@prisma/client';
import { toast } from './use-toast';
import { ToastAction } from './toast';
import { useRouter } from 'next/navigation';
import type { EmojiKey, EmojiLabel } from './comment';
export default function Emoji({
  emoji,
  emojiValue,
  isActive,
  count,
  authorId = null,
  commentId,
}: {
  emoji: EmojiLabel;
  emojiValue: EmojiKey;
  isActive: boolean;
  count: number;
  authorId: string | null;
  commentId: number;
}) {
  const router = useRouter();

  async function react() {
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
          emoji: emojiValue,
        }),
      });

      if (!res.ok) throw new Error('🙃 Something went wrong.');

      if (res.ok) {
        // reload the page
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: `Couldn't react to the comment!`,
        action: (
          <ToastAction onClick={() => react()} altText="Try again">
            Try again
          </ToastAction>
        ),
      });
    }
  }

  if (count === 0) return null;
  return (
    <div
      onClick={react}
      className={`${
        isActive ? 'border-color' : 'border'
      } border-[1px] rounded-2xl w-fit h-fit p-1 cursor-pointer m-1`}
    >
      <span className="pl-2">{emoji}</span>
      <span className="px-2">{count}</span>
    </div>
  );
}
