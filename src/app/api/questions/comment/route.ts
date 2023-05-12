import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../../prisma/prisma';

export async function POST(request: NextRequest) {
  const res = await request.json();
  const comment = res.comment;
  const postId = res.postId;
  const authorId = res.authorId;
  if (!comment || !authorId) {
    return new Response('Something went wrong!', {
      status: 500,
      statusText: 'No comment or authorId provided!',
    });
  }
  try {
    const success = await db.comment.create({
      data: {
        postId,
        authorId,
        body: comment,
      },
    });
    if (!success) {
      return new Response('Something went wrong!', {
        status: 500,
        statusText: 'Post not created!',
      });
    }

    return new Response('Comment created!', {
      // created comment
      status: 200,
      statusText: 'Comment created!',
    });
  } catch (error) {
    console.error('Error creating comment:', error);
  }
}
