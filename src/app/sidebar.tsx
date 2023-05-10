import {
  Home,
  LayoutGrid,
  Library,
  ListMusic,
  Mic2,
  Music,
  Music2,
  Pencil,
  PlayCircle,
  Radio,
  Tags,
  User,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/button';
import { ScrollArea } from '@/components/scroll-area';
import Tag from '@/components/tag';
import Link from 'next/link';

// import { Playlist } from '../data/playlists';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  playlists: any[];
}

export function Sidebar({ className, playlists }: SidebarProps) {
  return (
    <div className={cn('pb-12', className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Discover
          </h2>
          <div className="space-y-1">
            <Button
              variant="secondary"
              size="sm"
              className="w-full justify-start"
            >
              <Link className="flex justify-start items-center w-full" href="/">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Link
                className="flex justify-start items-center w-full"
                href="/browse"
              >
                <LayoutGrid className="mr-2 h-4 w-4" />
                Browse
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Link
                className="flex justify-start items-center w-full"
                href="/ask"
              >
                <Pencil className="mr-2 h-4 w-4" />
                Ask
              </Link>
            </Button>
          </div>
        </div>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Popular
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Link
                className="flex justify-start items-center w-full"
                href="/questions/categories/javascript"
              >
                <Tags className="mr-2 h-4 w-4" />
                JavaScript
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Link
                className="flex justify-start items-center w-full"
                href="/questions/categories/angular"
              >
                <Tags className="mr-2 h-4 w-4" />
                Angular
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Link
                className="flex justify-start items-center w-full"
                href="/questions/categories/react"
              >
                <Tags className="mr-2 h-4 w-4" />
                React
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Link
                className="flex justify-start items-center w-full"
                href="/questions/categories/typescript"
              >
                <Tags className="mr-2 h-4 w-4" />
                TypeScript
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Link
                className="flex justify-start items-center w-full"
                href="/questions/categories/next"
              >
                <Tags className="mr-2 h-4 w-4" />
                Next
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
