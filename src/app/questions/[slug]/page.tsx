import Link from 'next/link';
import { db } from '../../../../prisma/prisma';
import { Avatar } from '@/components/avatar';
import Image from 'next/image';
import UserAvatar from '@/components/user-avatar';
import Comment from '@/components/comment';

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
  console.log(data.comments.length);
  if (!data) {
    return null;
  }

  const userId = 0;

  return (
    <div className="flex flex-col justify-center items-center">
      <Link href={`users/${userId}`}>
        <UserAvatar size="xl" alt="" src={data.author.avatar ?? ''} />
      </Link>
      <span>@{data.author.username}</span>
      <span>{data.title}</span>
      <span>
        {data.updatedAt.toISOString() ?? data.createdAt.toISOString()}
      </span>
      {data.tags.map((tag) => (
        <span key={tag.id}>{tag.name}</span>
      ))}
      <div>
        <span>{data.body}</span>
      </div>
      <div>
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
      </div>
    </div>
  );
}
