
"use server"
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from '@/helpers/firebase';
// This function can be marked `async` if using `await` inside
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
	signInWithGoogle,
    GetUserWithEmailAndPassword,
	signOut,
	onAuthStateChanged
} from "@/lib/firebase/auth";

import { getAuthenticatedAppForUser } from "@/lib/firebase/firebase";
// const { currentUser } = await getAuthenticatedAppForUser();

export default async function middleware(request: NextRequest) {

  try {
    // const { currentUser } = await getAuthenticatedAppForUser();
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/login' || path === '/signup'
    const token = request.cookies.get('token')?.value || ''
    // const currentUser = auth.currentUser;
    // console.log("==========================", currentUser);
    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/profile', request.nextUrl))
    }
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.url))
    }
} catch (error: any) {
    console.error('Error in middleware:', error);
    throw new Error(error)
}

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/profile/:path*'
  ],
}