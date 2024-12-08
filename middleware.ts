// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // // 取得 token
  // const token = request.cookies.get('token')
  //
  // // 取得當前路徑
  // const { pathname } = request.nextUrl
  //
  // // 如果已經在登入頁，就不需要重新導向
  // if (pathname === '/login') {
  //   return NextResponse.next()
  // }
  //
  // // 沒有 token 就重導向到登入頁
  // if (true) {
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }
  //
  // // 有 token 就繼續
  return NextResponse.next()
}

// 設定哪些路徑需要經過 middleware 處理
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (登入頁面)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
  ],
}