import { Avatar, AvatarImage, AvatarFallback } from '@/components/avatar';
import { Pencil } from 'lucide-react';

import { Button } from '@/components/button';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from '@/components/command';
import { Input } from '@/components/input';
import Logo from '@/components/logo';
import { MainNav } from '@/components/main-nav';
import { ModeToggle } from '@/components/mode-toggle';
import Header from '@/components/header';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="  dark:bg-black w-full h-full">
      <Header />
      <main>
        <section className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-xl font-bold">
            Get the help of the community at the click of a button!
          </h1>
          <h1 className="text-xl font-bold">Feeling stuck?</h1>

          <Link href={'/ask'}>
            <Button className="my-4">
              <Pencil className="mr-2 h-4 w-4" /> Ask a question
            </Button>
          </Link>
        </section>
      </main>
    </div>
  );
}
