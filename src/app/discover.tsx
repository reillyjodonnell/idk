'use client';
import { Button } from '@/components/button';
import { Home, LayoutGrid, Pencil } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Discover() {
  const pathname = usePathname();
  return (
    <div className="space-y-1">
      <Button
        variant={pathname === '/' ? 'secondary' : 'ghost'}
        size="sm"
        className="w-full justify-start"
      >
        <Link className="flex justify-start items-center w-full" href="/">
          <Home className="mr-2 h-4 w-4" />
          Home
        </Link>
      </Button>
      <Button
        variant={pathname === '/browse' ? 'secondary' : 'ghost'}
        size="sm"
        className="w-full justify-start"
      >
        <Link className="flex justify-start items-center w-full" href="/browse">
          <LayoutGrid className="mr-2 h-4 w-4" />
          Browse
        </Link>
      </Button>
      <Button
        variant={pathname === '/ask' ? 'secondary' : 'ghost'}
        size="sm"
        className="w-full justify-start"
      >
        <Link className="flex justify-start items-center w-full" href="/ask">
          <Pencil className="mr-2 h-4 w-4" />
          Ask
        </Link>
      </Button>
    </div>
  );
}
