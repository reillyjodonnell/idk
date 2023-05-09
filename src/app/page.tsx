import { Divide, Pencil } from 'lucide-react';
import { Button } from '@/components/button';
import Header from '@/components/header';
import Link from 'next/link';
import { Sidebar } from './sidebar';
import RecentlyAsked from './recently-asked';

export default function Home() {
  return (
    // <div className="  dark:bg-black w-full h-full ">
    //   <Header className="py-2" />
    <main className="flex w-full dark:bg-black bg-white">
      <Sidebar className="w-1/5 border-r " playlists={[]} />
      <section className="flex h-full flex-col items-center justify-center flex-1">
        <div className="flex flex-col justify-center items-center my-20">
          <h1 className="text-xl font-bold">
            Get the help of the community at the click of a button!
          </h1>
          <h1 className="text-xl font-bold">Feeling stuck?</h1>
          <Link href={'/ask'}>
            <Button className="my-4">
              <Pencil className="mr-2 h-4 w-4" /> Ask a question
            </Button>
          </Link>
        </div>
        <RecentlyAsked />
      </section>
    </main>
    // </div>
  );
}
