import { NextResponse } from "next/server"
import authConfig from "../auth.config"
import NextAuth from "next-auth"
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, publicRoutes, authRoutes } from "../routes"


export const { auth } = NextAuth(authConfig)

export async function middleware(req: Request) {
  const isLoggedIn = !!(await auth())
  const url = new URL(req.url);
  console.log(req.url, isLoggedIn)

  const isApiAuthRoute = url.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(url.pathname)
  const isAuthRoute = authRoutes.includes(url.pathname)

  console.log(isPublicRoute)

  if(isApiAuthRoute){
    return NextResponse.next();
  }
  if(isAuthRoute){
    if(isLoggedIn){
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT,req.url))
    }

    if(!isLoggedIn && !isPublicRoute){
      NextResponse.redirect(new URL("/auth/login",req.url))
      return NextResponse.next()
    }
  }

  return NextResponse.next()
}

export default auth((req) => {
  
})


// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}