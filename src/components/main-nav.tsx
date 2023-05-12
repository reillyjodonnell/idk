'use client';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      <Link
        href="/ask"
        className={cn(
          'text-sm font-medium text-muted-foreground transition-colors hover:text-primary',
          pathname.includes('ask') && 'text-primary'
        )}
      >
        Ask
      </Link>
      {/* <Link
        href="/categories"
        className={cn(
          'text-sm font-medium text-muted-foreground transition-colors hover:text-primary',
          pathname.includes('categories') && 'text-primary'
        )}
      >
        Categories
      </Link> */}
      <Link
        href="/browse"
        className={cn(
          'text-sm font-medium text-muted-foreground transition-colors hover:text-primary',
          pathname.includes('browse') && 'text-primary'
        )}
      >
        Browse
      </Link>
      {/* <Link
        href="/settings"
        className={cn(
          'text-sm font-medium text-muted-foreground transition-colors hover:text-primary',
          pathname.includes('settings') && 'text-primary'
        )}
      >
        Settings
      </Link> */}
    </nav>
  );
}
