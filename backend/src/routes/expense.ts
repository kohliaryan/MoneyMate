import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { authMiddleware } from "../middleware/authorization";
import { expenseAdd } from "../controller/expense";

export const expenseRoute = new Hono<{
  Bindings: {
    PDATABASE_URL: string;
    JWT_Secret: string;
  };
  Variables: {
    user_id: number;
  };
}>();

expenseRoute.use(authMiddleware);
expenseRoute.post("/add", expenseAdd)