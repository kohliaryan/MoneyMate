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

export const expenseAddSchema = z.object({
  category_id: z.number(),
  amount: z.number(),
  description: z.string().optional(),
  date_of_expense: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});

export type ExpenseAddSchema = z.infer<typeof expenseAddSchema>;

export const updateExpenseSchema = z.object({
  amount: z.number(),
  description: z.string().optional(),
  date_of_expense: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});

export type UpdateExpenseSchema = z.infer<typeof updateExpenseSchema>;
