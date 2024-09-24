import { Hono } from "hono";
import { authMiddleware } from "../middleware/authorization";
import { expenseAdd, listController } from "../controller/expense";

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