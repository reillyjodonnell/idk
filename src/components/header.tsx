import Logo from './logo';
import { MainNav } from './main-nav';
import { Avatar, AvatarImage, AvatarFallback } from './avatar';
import { ModeToggle } from './mode-toggle';

export default function Header() {
  return (
    <header className="flex justify-center items-center supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 shadow-sm backdrop-blur">
      <Logo />
      <MainNav />
      <Avatar className="mx-6 h-8 w-8">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <ModeToggle />
    </header>
  );
}
