import { db } from '../../prisma/prisma';
import bcrypt from 'bcryptjs';

// Define the session timeout (e.g., 1 hour)
export const SESSION_TIMEOUT = 60 * 60 * 1000; // 1 hour in milliseconds

import crypto from 'crypto';

function generateSessionId() {
  return crypto.randomBytes(16).toString('hex');
}

type RegisterForm = {
  password: string;
  email: string;
  name: string;
  username: string;
};
export async function register({
  password,
  email,
  name,
  username,
}: RegisterForm) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: { name, username, password: passwordHash, email },
  });
  return { id: user.id, email };
}

export async function login({ password, email }: RegisterForm) {
  // check for user at email
  const user = await db.user.findFirst({
    where: {
      email,
    },
  });
  if (!user) {
    return null;
  }
  // if exists, compare hashed password
  const isCorrectPassword = await bcrypt.compare(password, user.password);

  if (!isCorrectPassword) {
    return null;
  }

  return { id: user.id, email };
}

export async function createSession(userId: string) {
  try {
    const session = await db.session.create({
      data: {
        id: generateSessionId(),
        userId,
        expiresAt: new Date(Date.now() + SESSION_TIMEOUT),
      },
    });
    if (!session) {
      return null;
    }
    return session.id;
  } catch (err) {
    console.error(err);
  }
}

export async function getSession() {
  // get session
  // return session cookie
  return null;
}

export async function deleteSession() {
  // delete session
  // delete session cookie
  return null;
}
