import { db } from '../../../../../prisma/prisma';
import {
  SESSION_TIMEOUT,
  createSession,
  deleteSession,
  login,
} from '@/lib/server-utils';
import { NextRequest } from 'next/server';
export async function POST(request: NextRequest) {
  const res = await request.json();
  const session = res?.session;
  // assign a session cookie to user
  const deleted = await deleteSession({ sessionId: session });
  if (!deleted) {
    return new Response('Something went wrong!', {
      status: 500,
      statusText: 'Something went wrong creating your session!',
    });
  }

  return new Response('Logout successful!', {
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': `session=; HttpOnly; Secure; SameSite=Strict; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
    },
    status: 200,
    statusText: 'OK',
  });
}
