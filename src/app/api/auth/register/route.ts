import { cookies } from 'next/headers';
import { db } from '../../../../../prisma/prisma';
import { SESSION_TIMEOUT, createSession, register } from '@/lib/server-utils';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(request: NextRequest) {
  const res = await request.json();
  const email = res?.email;
  const password = res?.password;

  if (!email || !password) {
    return new Response(`No ${email ? 'password' : 'email'} provided!`, {
      status: 400,
      statusText: `No ${email ? 'password' : 'email'} provided!`,
    });
  }

  const emailExists = await db.user.findFirst({
    where: {
      email,
    },
  });
  if (emailExists) {
    return new Response(`This email has already been used!`, {
      status: 400,
      statusText: `This email has already been used!`,
    });
  }

  const user = await register({ email, password });

  if (!user) {
    return new Response('Something went wrong creating your account!', {
      status: 500,
      statusText: 'Something went wrong creating your account!',
    });
  }

  // assign a session cookie to user
  const session = await createSession(user.id);

  if (!session) {
    return new Response('Something went wrong creating your session!', {
      status: 500,
      statusText: 'Something went wrong creating your session!',
    });
  }

  return new Response('User created!', {
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': `session=${session}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${SESSION_TIMEOUT}`,
    },
    status: 200,
    statusText: 'OK',
  });
}
