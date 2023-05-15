'use client';

import { cookies } from 'next/headers';
import { Button } from './button';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LogoutButton({
  session,
  alt = false,
}: {
  session: string;
  alt?: boolean;
}) {
  const router = useRouter();

  async function logout() {
    if (!session) return null;

    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        body: JSON.stringify({
          session,
        }),
      });
      if (!res.ok) throw new Error(res.statusText);
      // user created!
      if (res.ok) {
        router.refresh();
        router.push('/');
      }
    } catch (err: any) {
      console.error(err);
    }
  }

  if (alt) {
    return (
      <Button
        variant={'ghost'}
        onClick={logout}
        className="flex justify-start items-center px-0 py-1.5"
      >
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </Button>
    );
  }

  return (
    <Button onClick={logout} className="mx-6 h-8">
      Logout
    </Button>
  );
}
