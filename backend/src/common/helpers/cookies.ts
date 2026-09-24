import { Response } from "express";

export const addCookie = (response: Response, key: string, value: string,
     httpOnly: boolean = true, secure: boolean = false, maxAge:number = (1000 * 60 * 60 * 24), path:string = '/') => {
    response.cookie(key, value, {
        httpOnly: httpOnly,
        secure: true, // Always true for SameSite=None
        sameSite: 'none', // Crucial for cross-domain on Render
        maxAge: maxAge,
        path: path,
    });
}