import { Hono } from "hono";
import { authMiddleware } from "../middleware/authorization";
import { deleteExpense, expenseAdd, listController, updateExpense } from "../controller/expense";

export const expenseRouter = new Hono<{
  Bindings: {
    PDATABASE_URL: string;
    JWT_Secret: string;
  };
  Variables: {
    user_id: number;
  };
}>();

expenseRouter.use(authMiddleware);
expenseRouter.post("/add", expenseAdd)
expenseRouter.get("/list", listController)
expenseRouter.put("/update/:expense_id", updateExpense)
expenseRouter.delete("/delete/:expense_id", deleteExpense)