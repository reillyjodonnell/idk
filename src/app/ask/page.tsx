import { Separator } from '@/components/separator';
import { Tabs } from '@/components/tabs';
import Editor from './editor';
import PromptAlert from './prompt-alert';
import { retrieveUserServerOnly } from '../helpers/server-components/utils';

export default async function Page() {
  const user = await retrieveUserServerOnly();
  const userId = user?.id;
  if (!userId) return null;
  return (
    <>
      <div className="hidden h-full flex-col md:flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">Ask a Question</h2>
        </div>
        <Separator />
        <Tabs defaultValue="complete" className="flex-1">
          <div className="container h-full py-6">
            <PromptAlert />
            <Editor userId={userId} />
          </div>
        </Tabs>
      </div>
    </>
  );
}
