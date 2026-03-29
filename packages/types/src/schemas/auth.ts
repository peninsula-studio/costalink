import * as z from "zod";

export const emailSchema = z
  .email({ error: "Email inválido" })
  .transform((email) => email.toLowerCase());

export const passwordSchema = z
  .string()
  .min(8, { error: "Longitud mínima 8 caracteres" })
  .max(100, { error: "Longitud máxima 100 caracteres" })
  .regex(/[a-zA-Z]/, { error: "Debe contenter al menos una letra" })
  .regex(/[0-9]/, { error: "Debe contenter al menos un número" })
  .regex(/[^a-zA-Z0-9]/, {
    error: "Debe contener al menos un carácter especial",
  });

export const signUpFormSchema = z
  .object({
    name: z.string().min(2).max(128),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    error: "Las contraseñas no coinciden",
  });
