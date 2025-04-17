import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const jwtToken=request.cookies.get('jwtToken');
    const authToken=jwtToken?.value as string;
    if(!authToken)
    {
        if(request.nextUrl.pathname.startsWith("/api/users/profile"))
        {
            {
                return NextResponse.json({message:"No token provided, access denied"},{status:401});
            }

        }
    }
    else {
        if(request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/register"))
        {
            return NextResponse.redirect(new URL("/",request.url));
        }
    }
        
    return NextResponse.next();
}

export const config = {
    matcher: ["/api/users/profile/:path*","/login","/register"],
};