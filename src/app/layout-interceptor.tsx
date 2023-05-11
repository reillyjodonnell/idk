'use client';
import { usePathname } from 'next/navigation';

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
      {isLoginPage || isRegisterPage ? children : wrapper}
    </div>
  );
}
