import React from 'react';
import { db } from '../../../../prisma/prisma';
import UserAvatar from '@/components/user-avatar';
import Tag from '@/components/tag';
import { Tags } from 'lucide-react';
import { formatTime } from '@/lib/utils';
import FormattedContent from './formatted-content';
import CommentInput from './comment';
import Comment from '@/components/comment';
import { retrieveUserServerOnly } from '@/app/helpers/server-components/utils';

export default async function Page({ params }: any) {
  const postId = parseInt(params.slug);
  const user = await retrieveUserServerOnly();
  const data = await db.post.findUniqueOrThrow({
    where: {
      id: postId,
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
        orderBy: {
          createdAt: 'desc',
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

  return (
    <div className="flex flex-col justify-start items-center p-10">
      <div className="flex">
        {/* <Link href={`users/${userId}`}> */}
        <UserAvatar
          size="xl"
          alt=""
          src={
            ''
            // 'https://images.pexels.com/photos/16657191/pexels-photo-16657191.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          }
        />
        {/* </Link> */}
        <div className="flex flex-col justify-center">
          <span>@{data.author.username}</span>
          <span>
            {formatTime(data.updatedAt.toISOString()) ??
              formatTime(data.createdAt.toISOString())}
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-center my-4 ">
        <span className="font-bold text-3xl">{data.title}</span>

        <div className="flex justify-center items-center mt-4">
          <Tags className="h-4 w-4 flex-shrink-0 mr-2" />
          {data.tags.map((tag) => (
            <Tag key={tag.id} name={tag.name} />
          ))}
        </div>
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
              <React.Fragment key={comment.id}>
                <Comment
                  id={comment.id}
                  avatar={data.author.avatar ?? ''}
                  username={comment.author.username ?? ''}
                  authorId={comment.author.id}
                  body={comment.body}
                  createdAt={comment.createdAt}
                  updatedAt={comment.updatedAt}
                  fire={comment.fire}
                  thumbsUp={comment.thumbsUp}
                  thumbsDown={comment.thumbsDown}
                  eyes={comment.eyes}
                />
              </React.Fragment>
            ))}
          </>
        ) : (
          <div className="flex my-6">
            <span className="font-semibold text-xl">No comments yet 🥲</span>
          </div>
        )}

        <CommentInput postId={postId} authorId={user ? user.id : null} />
      </div>
    </div>
  );
}
