import { Hono } from "hono";
import { authMiddleware } from "../middleware/authorization";
import {
  categoryExpenseController,
  summaryController,
} from "../controller/summary";

export const summaryRouter = new Hono<{
  Bindings: {
    PDATABASE_URL: string;
    JWT_Secret: string;
  };
  Variables: {
    user_id: number;
  };
}>();

summaryRouter.use(authMiddleware);
summaryRouter.get("/", summaryController);
summaryRouter.get("/category/:category_id", categoryExpenseController);
