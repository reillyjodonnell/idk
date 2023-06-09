import { db } from '../../prisma/prisma';
import bcrypt from 'bcryptjs';

export const SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hour in milliseconds

import crypto from 'crypto';

function generateSessionId() {
  return crypto.randomBytes(16).toString('hex');
}

type RegisterForm = {
  password: string;
  email: string;
  username: string;
  name: string;
};
type LoginForm = {
  email: string;
  password: string;
};
export async function register({
  password,
  email,
  username,
  name,
}: RegisterForm) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: { password: passwordHash, email, username, name },
  });
  return { id: user.id, email, username, name };
}

export async function login({ password, email }: LoginForm) {
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

export async function getSession(sessionId: string) {
  // get user id tied to session
  if (!sessionId) return null;
  try {
    const session = await db.session.findFirst({
      where: {
        id: sessionId,
      },
    });
    if (!session) {
      return null;
    }
    const currentDate = new Date();
    if (currentDate > session.expiresAt) {
      await db.session.delete({
        where: {
          id: sessionId,
        },
      });
      return null;
    }
    return session.userId;
  } catch (err) {
    console.error(err);
  }
}

export async function deleteSession({ sessionId }: { sessionId: string }) {
  if (!sessionId) return null;
  try {
    const session = await db.session.delete({
      where: {
        id: sessionId,
      },
    });
    if (!session) {
      return null;
    }
    return 'Success';
  } catch (err) {
    console.error(err);
  }
}

export function removeSpacesFromSlug(url: string): string {
  return url.replace(/%20/g, ' ');
}
