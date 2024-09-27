import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(6),
});

export type SignupSchema = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type SigninSchema = z.infer<typeof signinSchema>;

export const updateProfileSchema = z.object({
  name: z.string(),
});

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
