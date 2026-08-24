import z from "zod";

const ZtypeEnum =  z.enum(['frecuencia-cardiaca','presion', 'glucosa', 'ritmo', 'oxigeno', 'peso'],{});
export type typeEnum = 'frecuencia-cardiaca'|'presion'| 'glucosa'| 'ritmo'| 'oxigeno'| 'peso'
export const signSchema = z.object({
    type: ZtypeEnum,
    value: z.number()
});

export type SignFormData = z.infer<typeof signSchema>;
