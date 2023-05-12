import Logo from './logo';
import { MainNav } from './main-nav';
import { Avatar, AvatarImage, AvatarFallback } from './avatar';
import { ModeToggle } from './mode-toggle';
import { cn } from '@/lib/utils';
import { Button } from './button';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { getSession } from '@/lib/server-utils';
import { db } from '../../prisma/prisma';
import { UserIcon } from 'lucide-react';
import LogoutButton from './logout-button-client';

export default async function Header({
  className = '',
}: {
  className?: string;
}) {
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

  return (
    <header
      className={cn(
        `py-2 px-8 flex justify-center items-center supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 shadow-sm backdrop-blur`,
        className
      )}
    >
      <Logo />
      <MainNav />
      <div className="flex justify-center items-center ml-auto">
        {user ? (
          <>
            <Avatar className="border-2 h-10 w-10">
              <AvatarImage src={user.avatar ?? ''} />
              <AvatarFallback>
                <UserIcon />
              </AvatarFallback>
            </Avatar>
            <LogoutButton session={session?.value ?? ''} />
          </>
        ) : (
          <Link href="/login">
            <Button className="mx-6 h-8">Login</Button>
          </Link>
        )}

        <ModeToggle />
      </div>
    </header>
  );
}
