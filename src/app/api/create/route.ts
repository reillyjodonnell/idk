import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../prisma/prisma';
import { marked } from 'marked';

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

  const aiUser = await db.user.findUnique({
    where: {
      username: 'AI',
    },
  });

  if (!aiUser) {
    return new Response('Something went wrong!', {
      status: 500,
      statusText: 'AI user not found!',
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

  // const content = `${body}. Format any code in HTML format, using the pre and code tags.`;

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
        messages: [{ role: 'user', content: body }],
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

  const responseMarkdown = chatGptResponseJson.choices[0].message.content;

  if (!responseMarkdown) {
    return new Response('Something went wrong!', {
      status: 500,
      statusText: 'Problem generating response!',
    });
  }

  const responseToHtml = marked(responseMarkdown);
  // store comment on post in db as AI response
  const comment = await db.comment.create({
    data: {
      body: responseToHtml,
      authorId: aiUser.id,
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
