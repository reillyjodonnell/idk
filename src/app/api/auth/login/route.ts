import { cookies } from 'next/headers';
import { db } from '../../../../../prisma/prisma';
import {
  SESSION_TIMEOUT,
  createSession,
  login,
  register,
} from '@/lib/server-utils';
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

  // check if email exists
  const emailExists = await db.user.findFirst({
    where: {
      email,
    },
  });

  if (!emailExists) {
    return new Response(`No account associated with this email!`, {
      status: 400,
      statusText: `No account associated with this email!`,
    });
  }

  const user = await login({ email, password });

  if (!user) {
    return new Response('Incorrect password!', {
      status: 500,
      statusText: 'Incorrect password!',
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

  // artifical delay of .1 s

  const redirectUrl = `${request.nextUrl.origin}/`;

  return NextResponse.redirect(redirectUrl, {
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': `session=${session}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${SESSION_TIMEOUT}`,
    },
    statusText: 'Found',
  });
}
