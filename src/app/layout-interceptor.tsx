'use client';
import { usePathname } from 'next/navigation';
import { Toaster } from 'react-hot-toast';

export default function LayoutInterceptor({
  children,
  wrapper,
}: {
  children: JSX.Element;
  wrapper: JSX.Element;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';
  const isRegisterPage = pathname === '/register';
  return (
    <div className="  dark:bg-black w-full h-full ">
      <Toaster />
      {isLoginPage || isRegisterPage ? children : wrapper}
    </div>
  );
}
