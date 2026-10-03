import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const cookieStore = await cookies();
    cookieStore.set("sesion_token", "", {
        maxAge: 0,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: new Date(0),
    });
    cookieStore.delete("sesion_token");
    
    return NextResponse.redirect(new URL("/get-started/auth", request.url));
}
