import type { Comment } from '@prisma/client';
import UserAvatar from './user-avatar';
import Link from 'next/link';

type CommentType = Pick<
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
export default function Comment(props: CommentType) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex items-center ">
        <Link className="p-1" href={`users/${props.authorId}`}>
          <UserAvatar
            src={props.avatar}
            alt={`${props.username}'s avatar`}
            size="md"
          />
        </Link>

        <div className="flex justify-center items-center w-full">
          <Link href={`users/${props.authorId}`}>
            <span className="font-semibold hover:underline">
              {props.username}
            </span>
          </Link>
          <span className="ml-auto">
            {props.updatedAt.toISOString() ?? props.createdAt.toISOString()}
          </span>
        </div>
      </div>
      <div>
        <span>{props.body}</span>
      </div>
      <div className="flex ">
        {props.thumbsUp ? (
          <div className="border rounded-2xl w-fit h-fit p-1 cursor-pointer">
            <span className="pl-2">👍</span>
            <span className="px-2">{props.thumbsUp}</span>
          </div>
        ) : null}
        {props.thumbsDown ? (
          <div className="border rounded-2xl w-fit h-fit p-1 cursor-pointer">
            <span className="pl-2">👎</span>
            <span className="px-2">{props.thumbsDown}</span>
          </div>
        ) : null}
        {props.fire ? (
          <div className="border rounded-2xl w-fit h-fit p-1 cursor-pointer">
            <span className="pl-2">🔥</span>
            <span className="px-2">{props.fire}</span>
          </div>
        ) : null}
        {props.eyes ? (
          <div className="border rounded-2xl w-fit h-fit p-1 cursor-pointer">
            <span className="pl-2">👀</span>
            <span className="px-2">{props.eyes}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
