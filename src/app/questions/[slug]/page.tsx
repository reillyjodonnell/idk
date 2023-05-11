import Link from 'next/link';
import { db } from '../../../../prisma/prisma';
import UserAvatar from '@/components/user-avatar';
import Comment from '@/components/comment';
import Tag from '@/components/tag';
import { Tags } from 'lucide-react';
import { formatTime } from '@/lib/utils';
import Editor from '@/app/ask/editor';
import { EditorContent } from '@tiptap/react';
import FormattedContent from './formatted-content';
import { Input } from '@/components/input';
import { Button } from '@/components/button';

export default async function Page({ params }: any) {
  const data = await db.post.findUniqueOrThrow({
    where: {
      id: parseInt(params.slug),
    },
    select: {
      id: true,
      title: true,
      body: true,
      createdAt: true,
      updatedAt: true,
      tags: true,
      comments: {
        select: {
          id: true,
          author: true,
          body: true,
          createdAt: true,
          updatedAt: true,
          eyes: true,
          fire: true,
          thumbsUp: true,
          thumbsDown: true,
        },
      },
      author: {
        select: {
          name: true,
          avatar: true,
          username: true,
          id: true,
        },
      },
    },
  });

  if (!data) {
    return null;
  }

  const userId = 0;

  return (
    <div className="flex flex-col justify-start items-center p-10">
      {/* <Link href={`users/${userId}`}> */}
      <UserAvatar size="xl" alt="" src={data.author.avatar ?? ''} />
      {/* </Link> */}
      <span>@{data.author.username}</span>
      <span>
        {formatTime(data.updatedAt.toISOString()) ??
          formatTime(data.createdAt.toISOString())}
      </span>
      <span className="font-bold text-2xl">{data.title}</span>

      <div className="flex justify-center items-center my-2">
        <Tags className="h-4 w-4 flex-shrink-0 mr-2" />
        {data.tags.map((tag) => (
          <Tag key={tag.id} name={tag.name} />
        ))}
      </div>

      <div>
        <FormattedContent content={data.body} title={data.title} />
      </div>
      <div className="w-full">
        {data.comments.length > 0 ? (
          <>
            <div className="flex my-4">
              <span className="font-semibold text-lg">Comments</span>
            </div>

            {data.comments.map((comment) => (
              <Comment
                id={comment.id}
                key={comment.id}
                avatar={data.author.avatar ?? ''}
                username={data.author.username}
                authorId={data.author.id}
                body={comment.body}
                createdAt={comment.createdAt}
                updatedAt={comment.updatedAt}
                fire={comment.fire}
                thumbsUp={comment.thumbsUp}
                thumbsDown={comment.thumbsDown}
                eyes={comment.eyes}
              />
            ))}
          </>
        ) : (
          <div className="flex my-6">
            <span className="font-semibold text-xl">No comments yet 🥲</span>
          </div>
        )}
        <div className="flex w-full my-12 items-center space-x-2">
          <Input
            type="text"
            className="py-6 text-base"
            placeholder="Write a response..."
          />
          <Button className="px-8 py-6" type="submit">
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
}
