import { cn } from '@/lib/utils';
import { db } from '../../prisma/prisma';
import type { Tag as TagType } from '@prisma/client';
import PopularTags from './popular-tags';
import Discover from './discover';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  playlists: any[];
}

export async function Sidebar({ className }: SidebarProps) {
  const top5PopularTags: TagType[] = await db.tag.findMany({
    select: {
      name: true,
      id: true,
    },
    orderBy: [
      {
        posts: {
          _count: 'desc',
        },
      },
    ],
    take: 5,
  });

  return (
    <div className={cn('pb-12 p-8 hidden md:block', className)}>
      <div className="space-y-4 py-4">
        <div className="py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Discover
          </h2>
          <Discover />
        </div>
        <div className=" py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Popular
          </h2>
          <div className="space-y-1">
            <PopularTags top5PopularTags={top5PopularTags} />
          </div>
        </div>
      </div>
    </div>
  );
}
