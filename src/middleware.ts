import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    const path = req.nextUrl.pathname

    // Public paths that don't require authentication
    const publicPaths = ["/", "/doctors", "/support", "/auth"]
    if (publicPaths.some(p => path.startsWith(p)) && path !== "/appointments") {
        return NextResponse.next()
    }

    // Redirect to signin if not authenticated
    if (!token) {
        const signInUrl = new URL("/auth/signin", req.url)
        signInUrl.searchParams.set("callbackUrl", path)
        return NextResponse.redirect(signInUrl)
    }

    // Role-based access control
    const role = token.role as string

    // Admin-only routes
    if (path.startsWith("/admin") && role !== "ADMIN") {
        return NextResponse.redirect(new URL("/unauthorized", req.url))
    }

    // Doctor-only routes
    if (path.startsWith("/doctor") && role !== "DOCTOR" && role !== "ADMIN") {
        return NextResponse.redirect(new URL("/unauthorized", req.url))
    }

    // Patient routes (appointments, history, book)
    if (
        (path.startsWith("/appointments") ||
            path.startsWith("/patient") ||
            path.startsWith("/book")) &&
        role !== "PATIENT" &&
        role !== "ADMIN"
    ) {
        return NextResponse.redirect(new URL("/unauthorized", req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/admin/:path*",
        "/doctor/:path*",
        "/patient/:path*",
        "/appointments/:path*",
        "/book/:path*",
        "/api/appointments/:path*",
        "/api/doctors/:path*",
        "/api/patients/:path*"
    ]
}
