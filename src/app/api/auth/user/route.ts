import type { NextRequest } from 'next/server';
import { db } from '../../../../../prisma/prisma';

export async function POST(request: NextRequest) {
  const res: string = await request.json();

  const session = res;

  console.log('after session var');
  if (!session) {
    return new Response('Something went wrong!', {
      status: 500,
      statusText: 'No session provided!',
    });
  }

  console.log('after not session check');
  // retrieve session from db to extract user id
  const sessionData = await db.session.findUnique({
    where: { id: session },
  });

  console.log('after session data');
  if (!sessionData) {
    return new Response('Something went wrong!', {
      status: 500,
      statusText: 'Session not found!',
    });
  }
  // check time for token expiry
  const now = new Date();
  // check if token is expired
  if (now > sessionData.expiresAt) {
    // delete session from db
    await db.session.delete({
      where: { id: session },
    });
    return new Response('Something went wrong!', {
      status: 500,
      statusText: 'Session expired!',
    });
  }
  console.log('after expiry check');

  // retrieve user from db to see if token is valid
  const userData = await db.user.findUnique({
    where: { id: sessionData.userId },
  });

  console.log(userData);

  if (!userData) {
    return new Response('Something went wrong!', {
      status: 500,
      statusText: 'User not found!',
    });
  }
  return new Response(JSON.stringify(userData), {
    headers: {
      'Content-Type': 'application/json',
    },
    status: 200,
    statusText: 'OK',
  });
}
