import { Button } from '@/components/button';
import { capitalizeFirstLetter } from '@/lib/utils';
import type { Tag } from '@prisma/client';
import { Tags } from 'lucide-react';
import Link from 'next/link';

export default function PopularTags({
  top5PopularTags,
}: {
  top5PopularTags: Tag[];
}) {
  if (!top5PopularTags || top5PopularTags.length === 0) return null;

  return (
    <>
      {top5PopularTags.map((tag) => (
        <Button
          key={tag.id}
          variant="ghost"
          size="sm"
          className="w-full justify-start"
        >
          <Link
            className="flex justify-start items-center w-full"
            href={`/browse/${tag.name}`}
          >
            <Tags className="mr-2 h-4 w-4" />
            {capitalizeFirstLetter(tag.name)}
          </Link>
        </Button>
      ))}
    </>
  );
}
