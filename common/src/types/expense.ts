import { z } from "zod";

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
