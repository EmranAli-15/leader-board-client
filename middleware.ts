// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const authRoutes = ["/login", "/register"]
const privetRoutes = ["/profile"]

export function middleware(request: NextRequest) {
    const token = request.cookies.get('auth')?.value;
    const { pathname } = request.nextUrl;

    if (token && authRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/", request.url))
    }
    else if (!token && privetRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    return NextResponse.next();
}

// Optionally, define a matcher to run middleware only on specific paths
export const config = {
    matcher: ['/profile', '/login'],
};
