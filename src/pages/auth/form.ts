import z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

export type loginFormInputs = z.infer<typeof loginSchema>;

export type registerFormInputs = z.infer<typeof registerSchema>;
