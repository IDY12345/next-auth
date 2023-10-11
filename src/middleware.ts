import { getToken } from "next-auth/jwt";
import { NextRequest,NextResponse } from "next/server";
import { CustomUser } from "./app/api/auth/[...nextauth]/option";

export async function middleware(request:NextRequest){
    const {pathname}=request.nextUrl

    if(pathname=="/login" || pathname=="/admin/login")
    {
        return NextResponse.next()
    }

    const token=await getToken({req:request})

    // Protected Routes for User
    const userProtected=["/"]

    //Protected Routes for Admin

    const adminProtected=["/admin/dashboard"]

    if(token==null && (userProtected.includes(pathname) || adminProtected.includes(pathname)))
    {
        return NextResponse.redirect(new URL("/login?error=Please Login First to Access These Route.",request.url))
    }

    //Get User From Token

    const user:CustomUser|null =token?.user as CustomUser;

    // If User Try to Access Admin Routes 

    if(adminProtected.includes(pathname) && user.role=="User")
    {
        return NextResponse.redirect(new URL("/admin/login?error=Please Login First",request.url))
    }

    //If Admin Try To Access User Routes

    if(userProtected.includes(pathname)&& user.role=="Admin")
    {
        return NextResponse.redirect(new URL("/login?error=Please Login First",request.url))
    }
}