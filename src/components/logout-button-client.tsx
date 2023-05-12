'use client';

import { cookies } from 'next/headers';
import { Button } from './button';

export default function LogoutButton({ session }: { session: string }) {
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
      if (res.ok) window.location.reload();
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <Button onClick={logout} className="mx-6 h-8">
      Logout
    </Button>
  );
}
