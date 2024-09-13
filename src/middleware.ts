import { NextResponse, NextRequest } from 'next/server'

import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(req) {
    const token = await getToken({
      req,
    })
    if (
      !token &&
      req.nextUrl.pathname.startsWith('/contribute-to-earn/account')
    ) {
      return NextResponse.redirect(new URL('/contribute-to-earn', req.url))
    }
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: () => true,
    },
  },
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/contribute-to-earn/account/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
