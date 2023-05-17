import { cookies } from 'next/headers';
import { db } from '../../../../../prisma/prisma';
import { SESSION_TIMEOUT, createSession, register } from '@/lib/server-utils';
import { NextRequest, NextResponse } from 'next/server';

// Function to validate the username
function validateUsername(username: string) {
  const regex = /^[a-zA-Z0-9-]+$/; // Regular expression to match alphanumeric characters and hyphens
  const minLength = 4;
  const maxLength = 39;

  if (!regex.test(username)) {
    return 'Usernames can only contain letters, numbers, and hyphens.';
  }

  if (username.length < minLength || username.length > maxLength) {
    return `Usernames must be between ${minLength} and ${maxLength} characters long.`;
  }

  return null; // Username is valid
}
export async function POST(request: NextRequest) {
  const res = await request.json();
  const email = res?.email;
  const password = res?.password;
  const username = res?.username;

  if (!email || !password || !username) {
    const missingField = !email ? 'email' : !password ? 'password' : 'username';
    return new Response(`No ${missingField} provided!`, {
      status: 400,
      statusText: `No ${missingField} provided!`,
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
  const lowerCaseUsername = username.toLowerCase();

  const usernameExists = await db.user.findFirst({
    where: {
      username: lowerCaseUsername,
    },
  });
  if (usernameExists) {
    return new Response(`This username has already been taken!`, {
      status: 400,
      statusText: `This username has already been taken!`,
    });
  }

  const usernameError = validateUsername(username);
  if (usernameError) {
    return new Response(usernameError, {
      status: 400,
      statusText: usernameError,
    });
  }

  const user = await register({
    email,
    password,
    username: lowerCaseUsername,
    name: username,
  });

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
