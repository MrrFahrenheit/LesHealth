import { Response } from "express";

export const addCookie = (response: Response, key: string, value: string,
     httpOnly: boolean = true, secure: boolean = false, maxAge:number = (1000 * 60 * 60 * 24), path:string = '/') => {
    response.cookie(key, value, {
        httpOnly: httpOnly,
        secure: process.env.NODE_ENV === 'production' ? true : secure,
        sameSite: 'lax',
        maxAge: maxAge,
        path: path,
    });
}