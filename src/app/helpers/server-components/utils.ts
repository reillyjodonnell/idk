import { getSession } from '@/lib/server-utils';
import { cookies } from 'next/headers';
import { db } from '../../../../prisma/prisma';

export async function retrieveUserServerOnly() {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get('session');
    const userId = session ? await getSession(session.value) : null;
    const user = userId
      ? await db.user.findFirst({
          where: {
            id: userId,
          },
        })
      : null;
    return user;
  } catch (err) {
    console.error(err);
  }
}
