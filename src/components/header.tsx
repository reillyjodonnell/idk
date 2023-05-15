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
import { LogOut, User, UserIcon } from 'lucide-react';
import LogoutButton from './logout-button-client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';

async function retrieve() {
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

export default async function Header({
  className = '',
}: {
  className?: string;
}) {
  const user = await retrieve();
  const cookieStore = cookies();
  const session = cookieStore.get('session');

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
            <div className="hidden sm:flex justify-center items-center">
              <Avatar className="border-2 h-10 w-10">
                <AvatarImage src={user.avatar ?? ''} />
                <AvatarFallback>
                  <UserIcon />
                </AvatarFallback>
              </Avatar>
              <LogoutButton session={session?.value ?? ''} />
            </div>
            <div className="block sm:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="border-2 h-10 w-10">
                      <AvatarImage src={user.avatar ?? ''} />
                      <AvatarFallback>
                        <UserIcon />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.username}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ModeToggle size="sm" className="w-6 justify-start" />
                      <span>Toggle theme</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogoutButton session={session?.value ?? ''} alt={true} />

                    {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        ) : !user ? (
          <Link href="/login">
            <Button className="mx-4 sm:mx-6 h-6 sm:h-8">Login</Button>
          </Link>
        ) : null}
        <div className="hidden sm:flex">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
