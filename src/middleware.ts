import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const fetchUrl = `${request.nextUrl.origin}/api/auth/user`;
  const session = request.cookies.get('session');

  if (!session) {
    const redirectUrl = `${request.nextUrl.origin}/login`;
    return NextResponse.redirect(redirectUrl);
  }

  try {
    const user = await (
      await fetch(fetchUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(session.value),
      })
    ).json();

    if (!user) {
      const redirectUrl = `${request.nextUrl.origin}/login`;
      return NextResponse.redirect(redirectUrl);
    }
  } catch (err) {
    console.error(err);
    const redirectUrl = `${request.nextUrl.origin}/login`;
    return NextResponse.redirect(redirectUrl);
  }

  return;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/ask'],
};
