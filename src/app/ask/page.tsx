import { Separator } from '@/components/separator';
import { Tabs } from '@/components/tabs';
import Editor from './editor';
import PromptAlert from './prompt-alert';
import { cookies } from 'next/headers';
import { getSession } from '@/lib/server-utils';
import { db } from '../../../prisma/prisma';

export default async function Page() {
  const cookieStore = cookies();
  const session = cookieStore.get('session');
  const userIdSession = session ? await getSession(session.value) : null;
  const user = userIdSession
    ? await db.user.findFirst({
        where: {
          id: userIdSession,
        },
      })
    : null;
  if (!user?.id) return null;
  return (
    <>
      <div className=" h-full flex-col md:flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">Ask a Question</h2>
        </div>
        <Separator />
        <Tabs defaultValue="complete" className="flex-1 h-full">
          <div className="container h-full py-6">
            <PromptAlert />
            <Editor userId={user?.id} />
          </div>
        </Tabs>
      </div>
    </>
  );
}
