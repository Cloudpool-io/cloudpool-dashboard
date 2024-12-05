import z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});
export const registerSchema = z
  .object({
    email: z.string().email({
      message: "Invalid email",
    }),
    password: z.string().min(5, {
      message: "Password must be at least 5 characters",
    }),
    confirmPassword: z.string().min(5, {
      message: "Password must be at least 5 characters",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type loginFormInputs = z.infer<typeof loginSchema>;

export type registerFormInputs = z.infer<typeof registerSchema>;
