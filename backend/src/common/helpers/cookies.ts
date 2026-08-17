import { Response } from "express";

export const addCookie = (response: Response, key: string, value: string,
     httpOnly: boolean = true, secure: boolean = false, maxAge:number = (1000 * 60 * 60 * 24), path:string = '/') => {
    response.cookie(key, value, {
        httpOnly: httpOnly,                               // Inaccesible desde JavaScript (Protege de XSS)
        secure: secure, //process.env.NODE_NODE_ENV === 'production', // Solo HTTPS en producción
        sameSite: 'lax',                              // Protege contra ataques CSRF
        maxAge: maxAge,                  // Tiempo de vida: 1 día (en milisegundos)
        path: path,                                    // Disponible en todas las rutas de la API
    });
}