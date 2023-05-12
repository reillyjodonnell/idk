import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../prisma/prisma';

export async function POST(request: NextRequest) {
  const res = await request.json();

  // create post
  const title = res.title;
  const body = res.body;
  const tags = res.tags;
  const userId = res.userId;
  if (!title || !body || !userId) {
    return new Response('Something went wrong!', {
      status: 500,
      statusText: 'No title, body or userId provided!',
    });
  }
  const createdAt = new Date();
  const updatedAt = new Date();
  const post = await db.post.create({
    data: {
      title,
      body,
      createdAt,
      updatedAt,
      authorId: userId,
      tags: {
        connect: tags.map((tag: string) => ({ name: tag })),
      },
    },
  });
  if (!post) {
    return new Response('Something went wrong!', {
      status: 500,
      statusText: 'Post not created!',
    });
  }

  const redirectUrl = `${request.nextUrl.origin}/`;

  return NextResponse.redirect(redirectUrl, {
    headers: {
      'Content-Type': 'application/json',
    },
    status: 302, // Redirect status code
    statusText: 'Created',
  });
}
