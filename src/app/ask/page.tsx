'use client';

import { Metadata } from 'next';
import { History, Pencil, Terminal, X } from 'lucide-react';

import { Button } from '@/components/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/hover-card';
import { Label } from '@/components/label';
import { Separator } from '@/components/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/tabs';
import { Textarea } from '@/components/textarea';
import Header from '@/components/header';
import AlertComponent from '@/client-components/alert';
import Editor from './editor';
import { Suspense } from 'react';
import { Skeleton } from '@/components/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/alert';
import PromptAlert from './prompt-alert';
import { TagSelector } from './tag-selector';

// export const metadata: Metadata = {
//   title: 'Playground',
//   description: 'The OpenAI Playground built using the components.',
// };

const options = [
  { label: 'JavaScript', value: 'JavaScript' },
  { label: 'React', value: 'React' },
  { label: 'Angular', value: 'Angular' },
  { label: 'Vue.js', value: 'Vue.js' },
  { label: 'Node.js', value: 'Node.js' },
  { label: 'Java', value: 'Java' },
  { label: 'Spring', value: 'Spring' },
  { label: 'Python', value: 'Python' },
  { label: 'Django', value: 'Django' },
  { label: 'Flask', value: 'Flask' },
  { label: 'PHP', value: 'PHP' },
  { label: 'Laravel', value: 'Laravel' },
  { label: 'Symfony', value: 'Symfony' },
  { label: 'Ruby', value: 'Ruby' },
  { label: 'Rails', value: 'Rails' },
  { label: 'C#', value: 'C#' },
  { label: '.NET', value: '.NET' },
  { label: 'ASP.NET', value: 'ASP.NET' },
  { label: 'Swift', value: 'Swift' },
  { label: 'iOS', value: 'iOS' },
  { label: 'Android', value: 'Android' },
  { label: 'Kotlin', value: 'Kotlin' },
  { label: 'Go', value: 'Go' },
  { label: 'Rust', value: 'Rust' },
  { label: 'TypeScript', value: 'TypeScript' },
  { label: 'Express.js', value: 'Express.js' },
  { label: 'Next.js', value: 'Next.js' },
  { label: 'Gatsby', value: 'Gatsby' },
  { label: 'Nest.js', value: 'Nest.js' },
  { label: 'React Native', value: 'React Native' },
  { label: 'Flutter', value: 'Flutter' },
  { label: 'Vue Native', value: 'Vue Native' },
  { label: 'Ionic', value: 'Ionic' },
  { label: 'Electron', value: 'Electron' },
  { label: 'jQuery', value: 'jQuery' },
  { label: 'Bootstrap', value: 'Bootstrap' },
  { label: 'Tailwind CSS', value: 'Tailwind CSS' },
  { label: 'Sass', value: 'Sass' },
  { label: 'Less', value: 'Less' },
  { label: 'PostgreSQL', value: 'PostgreSQL' },
  { label: 'MySQL', value: 'MySQL' },
  { label: 'MongoDB', value: 'MongoDB' },
  { label: 'Redis', value: 'Redis' },
  { label: 'GraphQL', value: 'GraphQL' },
  { label: 'Apollo', value: 'Apollo' },
  { label: 'REST API', value: 'REST API' },
  { label: 'WebSocket', value: 'WebSocket' },
  { label: 'Docker', value: 'Docker' },
  { label: 'Kubernetes', value: 'Kubernetes' },
];

export default function Page() {
  return (
    <>
      {/* <Header className="py-2" /> */}

      <div className="hidden h-full flex-col md:flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">Ask a Question</h2>
          {/* <div className="ml-auto flex w-full space-x-2 sm:justify-end">
            <PresetSelector presets={presets} />
            <PresetSave />
            <div className="hidden space-x-2 md:flex">
              <CodeViewer />
              <PresetShare />
            </div>
            <PresetActions />
          </div> */}
        </div>

        <Separator />

        <Tabs defaultValue="complete" className="flex-1">
          <div className="container h-full py-6">
            <PromptAlert />

            <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
              <div className="hidden h-full border justify-start items-center p-4 flex-col space-y-4 sm:flex md:order-2">
                <div className="grid gap-2 relative ">
                  <TagSelector title="Tags" options={options} />
                </div>
              </div>
              <div className="md:order-1 h-full">
                <TabsContent
                  value="complete"
                  className="mt-0 border-0 p-0 h-full"
                >
                  <Editor />
                </TabsContent>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </>
  );
}
