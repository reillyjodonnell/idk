import Logo from './logo';
import { MainNav } from './main-nav';
import { Avatar, AvatarImage, AvatarFallback } from './avatar';
import { ModeToggle } from './mode-toggle';
import { cn } from '@/lib/utils';
import { Button } from './button';
import Link from 'next/link';

export default function Header({ className = '' }: { className?: string }) {
  // retrieve user
  const user = null;
  return (
    <header
      className={cn(
        `py-2 flex justify-center items-center supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 shadow-sm backdrop-blur`,
        className
      )}
    >
      <Logo />
      <MainNav />
      {user ? (
        <Avatar className="mx-6 h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ) : (
        <Link href="/login">
          <Button className="mx-6 h-8">Login</Button>
        </Link>
      )}

      <ModeToggle />
    </header>
  );
}
