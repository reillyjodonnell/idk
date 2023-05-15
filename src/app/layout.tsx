import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import LayoutInterceptor from './layout-interceptor';
import Header from '@/components/header';
import { Sidebar } from './sidebar';
import { Toaster } from '@/components/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'idk',
  description:
    'Get answers to your programming questions, faster, and without toxicity',
};

export default function RootLayout({ children }: { children: JSX.Element }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <LayoutInterceptor
            wrapper={
              <>
                {/* @ts-expect-error Server Component */}
                <Header />
                <main className="flex w-full h-full">
                  {/* @ts-expect-error Server Component */}
                  <Sidebar className="w-1/5 border-r " />
                  {children}
                </main>
              </>
            }
          >
            {children}
          </LayoutInterceptor>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
