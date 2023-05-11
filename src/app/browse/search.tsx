'use client';

import { Input } from '@/components/input';
import { usePathname, useRouter } from 'next/navigation';
import { startTransition } from 'react';

export default function Search() {
  const { replace } = useRouter();
  const pathname = usePathname();

  function handleSearch(criteria: string) {
    const params = new URLSearchParams(window.location.search);
    if (criteria) {
      params.set('search', criteria);
    } else {
      params.delete('search');
    }
    params.delete('page');

    startTransition(() => {
      replace(`${pathname}?search=${criteria}`);
    });
  }

  return (
    <Input
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="Search for a question..."
      className="h-12 w-full lg:w-[450px]"
    />
  );
}
