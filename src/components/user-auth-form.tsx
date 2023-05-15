'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Label } from '@/components/label';
import { Icons } from '@/components/icons';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from './alert';
import { AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserRegisterAuthForm({
  className,
  ...props
}: UserAuthFormProps) {
  const [error, setError] = useState<null | string>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          username,
        }),
      });
      if (!res.ok) throw new Error(res.statusText);
      // user created!
      // hard refresh to home page due to Next bug
      if (res.ok) {
        toast('Account created!', {
          icon: '🥳',
          position: 'bottom-right',
        });
        router.refresh();
        router.push('/');
      }
    } catch (err: any) {
      if (err.message) {
        setError(err.message);
      }
    }

    setIsLoading(false);
  }

  function handleEmailInput(value: string) {
    if (error) {
      setError(null);
    }
    setEmail(value);
  }

  function handlePasswordInput(value: string) {
    if (error) {
      setError(null);
    }
    setPassword(value);
  }

  function handleUsernameInput(value: string) {
    if (error) {
      setError(null);
    }
    setUsername(value);
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      {error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
      <form onSubmit={onSubmit} method="post">
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="username"
              type="text"
              name="username"
              autoCapitalize="none"
              onChange={(e) => handleUsernameInput(e.target.value)}
              autoCorrect="off"
              disabled={isLoading}
              required
            />
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              name="email"
              autoCapitalize="none"
              onChange={(e) => handleEmailInput(e.target.value)}
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              required
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="password"
              type="password"
              name="password"
              autoCapitalize="none"
              onChange={(e) => handlePasswordInput(e.target.value)}
              autoCorrect="off"
              disabled={isLoading}
              required
            />
          </div>
          <Button disabled={isLoading || email === '' || username === ''}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Register with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{' '}
        Github
      </Button>
    </div>
  );
}
