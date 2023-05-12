import type { Comment, Reaction } from '@prisma/client';
import UserAvatar from './user-avatar';
import Link from 'next/link';
import ReactionPopover from './reaction-popover';
import { formatTime } from '@/lib/utils';
import { retrieveUserServerOnly } from '@/app/helpers/server-components/utils';
import { db } from '../../prisma/prisma';
import Emoji from './emoji.client';

type CommentType = {
  [key: string]: any;
} & Pick<
  Comment,
  | 'id'
  | 'body'
  | 'createdAt'
  | 'updatedAt'
  | 'eyes'
  | 'fire'
  | 'thumbsUp'
  | 'thumbsDown'
  | 'authorId'
> & {
    avatar: string;
    username: string;
  };

export type EmojiLabel = '👍' | '👎' | '🔥' | '👀';
export type EmojiKey = 'thumbsUp' | 'thumbsDown' | 'fire' | 'eyes';

type Emoji = {
  label: EmojiLabel;
  value: EmojiKey;
};

const EMOJIS: Emoji[] = [
  { label: '👍', value: 'thumbsUp' },
  { label: '👎', value: 'thumbsDown' },
  { label: '🔥', value: 'fire' },
  { label: '👀', value: 'eyes' },
];

export default async function Comment(props: CommentType) {
  const user = await retrieveUserServerOnly();

  const reaction = user?.id
    ? await db.reaction.findFirst({
        where: {
          commentId: props.id,
          authorId: user.id,
        },
      })
    : null;

  function isUsersEmojiReaction(reaction: Reaction | null, emoji: string) {
    return reaction?.emoji === emoji && reaction?.authorId === user?.id;
  }

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-2 my-2 ">
      <div className="flex items-center ">
        {/* <Link className="p-1" href={`users/${props.authorId}`}> */}
        <div className="ml-2">
          <UserAvatar
            src={props.avatar}
            alt={`${props.username}'s avatar`}
            size="lg"
            className=""
          />
        </div>

        {/* </Link> */}

        <div className="flex justify-center items-center w-full pr-2">
          {/* <Link href={`users/${props.authorId}`}> */}
          <span className="font-semibold hover:underline cursor-pointer text-lg ">
            {props.username}
          </span>
          {/* </Link> */}
          <span className="ml-auto">
            {formatTime(props.updatedAt.toISOString()) ??
              formatTime(props.createdAt.toISOString())}
          </span>
        </div>
      </div>
      <div className="p-4">
        <span>{props.body}</span>
      </div>
      <div className="flex ">
        {EMOJIS.map((emoji) => {
          const isActive = isUsersEmojiReaction(reaction, emoji.value);
          return (
            <Emoji
              key={emoji.value}
              emojiValue={emoji.value}
              isActive={isActive}
              count={props[emoji.value]}
              emoji={emoji.label}
              authorId={user?.id ?? null}
              commentId={props.id}
            />
          );
        })}

        <div className="ml-auto">
          <ReactionPopover
            commentAuthorId={props.authorId}
            authorId={user ? user.id : null}
            commentId={props.id}
          />
        </div>
      </div>
    </div>
  );
}
