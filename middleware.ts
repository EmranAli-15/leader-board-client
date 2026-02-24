// middleware.ts
import { jwtDecode } from 'jwt-decode';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const authRoutes = ["/login", "/register"]
const privetRoutes = ["/profile", "/feedback", "/task-submit"]
const adminRoutes = ["/admin", "/admin-add", "/admin-edit"]

export function middleware(request: NextRequest) {
    const token = request.cookies.get('auth')?.value;

    let decoded;
    if (token) {
        decoded = jwtDecode(token);
    }

    const { pathname } = request.nextUrl;

    if (token && authRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/", request.url))
    }
    else if (!token && (privetRoutes.includes(pathname) || adminRoutes.includes(pathname))) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    return NextResponse.next();
}

// Optionally, define a matcher to run middleware only on specific paths
export const config = {
    matcher: [
        "/login",
        "/register",

        "/profile",
        "/feedback",
        "/task-submit",

        "/admin",
        "/admin-add",
        "/admin-edit"
    ],
};
