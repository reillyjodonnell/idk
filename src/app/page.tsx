import { Pencil } from 'lucide-react';
import { Button } from '@/components/button';
import Link from 'next/link';
import RecentlyAsked from './recently-asked';

export default function Home() {
  return (
    <section className="flex h-full flex-col items-center justify-start flex-1">
      <div className="flex flex-col justify-center items-center pt-8 my-8 lg:my-20">
        <h1 className="text-3xl w-3/5 text-center font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1] md:block">
          Feeling stuck?
        </h1>
        <h1 className="my-6 text-muted-foreground text-xl w-4/5 text-center font-bold leading-tight tracking-tighter md:text-2xl lg:text-3xl lg:leading-[1.1] md:block">
          Get help from our friendly community & AI at the click of a button!
        </h1>
        <Link href={'/ask'}>
          <Button className="px-8 py-6 bg-primary">
            <Pencil className="mr-2 h-4 w-4" /> Ask a question
          </Button>
        </Link>
      </div>
      {/* @ts-expect-error Server Component */}
      <RecentlyAsked />
    </section>
  );
}
