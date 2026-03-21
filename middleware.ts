import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ADMIN_SECRET = 'sg-admin-secret-2026'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin/dashboard')) {
    if (request.cookies.get('sg_admin_session')?.value !== ADMIN_SECRET)
      return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  if (pathname.startsWith('/admin/sub-dashboard')) {
    if (!request.cookies.get('sg_sub_session')?.value)
      return NextResponse.redirect(new URL('/admin/sub-login', request.url))
  }

  if (pathname.startsWith('/teacher/dashboard')) {
    if (!request.cookies.get('sg_teacher_session')?.value)
      return NextResponse.redirect(new URL('/teacher/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/dashboard/:path*', '/admin/sub-dashboard/:path*', '/teacher/dashboard/:path*'],
}
