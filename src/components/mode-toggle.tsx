'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu';
import { Icons } from './icons';
import clsx from 'clsx';

const sizeClasses = {
  sm: '16',
  md: '24',
};

export function ModeToggle({
  className = '',
  size = 'md',
}: {
  className?: string;
  size?: keyof typeof sizeClasses;
}) {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          onClick={
            size === 'sm'
              ? () => setTheme(theme === 'dark' ? 'light' : 'dark')
              : () => {}
          }
          className={clsx('w-9 px-0', className)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={sizeClasses[size]}
            height={sizeClasses[size]}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          >
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 3v1"></path>
            <path d="M12 20v1"></path>
            <path d="M3 12h1"></path>
            <path d="M20 12h1"></path>
            <path d="m18.364 5.636-.707.707"></path>
            <path d="m6.343 17.657-.707.707"></path>
            <path d="m5.636 5.636.707.707"></path>
            <path d="m17.657 17.657.707.707"></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={sizeClasses[size]}
            height={sizeClasses[size]}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
          </svg>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      {size === 'md' && (
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme('light')}>
            <Icons.sun className="mr-2 h-4 w-4" />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('dark')}>
            <Icons.moon className="mr-2 h-4 w-4" />
            <span>Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('system')}>
            <Icons.laptop className="mr-2 h-4 w-4" />
            <span>System</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
