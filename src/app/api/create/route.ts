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

  const content = `${body}. Format code in HTML only.`;

  // now chat gpt needs to respond with a message
  const chatGptResponse = await fetch(
    'https://api.openai.com/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content }],
      }),
    }
  );

  if (!chatGptResponse) {
    return new Response('Something went wrong!', {
      status: 500,
      statusText: 'Problem generating response!',
    });
  }

  const chatGptResponseJson = await chatGptResponse.json();

  const response = chatGptResponseJson.choices[0].message.content;

  if (!response) {
    return new Response('Something went wrong!', {
      status: 500,
      statusText: 'Problem generating response!',
    });
  }
  // store comment on post in db as AI response
  const comment = await db.comment.create({
    data: {
      body: response,
      authorId: process.env.AI_ID!,
      postId: post.id,
    },
  });

  if (!comment) {
    return new Response('Something went wrong!', {
      status: 500,
      statusText: 'Comment not created!',
    });
  }

  // redirect to home page
  const redirectUrl = `${request.nextUrl.origin}/`;

  return NextResponse.redirect(redirectUrl, {
    headers: {
      'Content-Type': 'application/json',
    },
    status: 302, // Redirect status code
    statusText: 'Created',
  });
}
